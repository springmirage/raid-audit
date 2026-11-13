# M8 场地光柱提取与回放坐标校准

## 数据来源与操作顺序

优先读取活动当晚的本地原始 `WoWCombatLog-*.txt`，流式扫描 `WORLD_MARKER_PLACED` / `WORLD_MARKER_REMOVED`。不要只扫战斗内片段：光柱通常在开战前放置。此次 WCL 战斗事件包没有光柱，不能据此断言原报告或本地日志没有。

按时间顺序处理：PLACED 为对应索引建立位置与起始时间；相同索引再次 PLACED 则结束旧区间并开始新区间；REMOVED 结束该索引区间。回放按绝对时刻筛选 `start <= now < end`。仅为同一活动报告、同一场地应用，不跨夜复用。

### 实际字段（逗号分隔，从事件名起零编号）

- PLACED：0 事件名，1 instanceID，2 marker，3 世界 X，4 世界 Y。
- REMOVED：0 事件名，1 marker。它没有 instanceID 或坐标，不能套用 PLACED 字段布局。
- 行首为本地日期时间，另行解析。2026-11-12 来源为 Asia/Shanghai；公开界面显示整秒，内部保留毫秒用于区间判断。
- 世界光柱原始索引为 0–7；与 `/wm` 的 1–8 顺序对应，不能套用单位头顶目标标记的索引顺序。
- 原始日志 instanceID=3004，单位位置 mapID=2610：它们是不同字段，不因不相等而丢弃光柱。必须核对当晚实例/地图、时间和坐标范围。

## 2026-11-12 八标实例

原始文件：`WoWCombatLog-111226_202647.txt`。报告：`BzkQJdKW4x3vwDG2`。

|原始索引|光柱|放置时间|世界 X|世界 Y|WCL x|WCL y|源行|
|---|---|---|---:|---:|---:|---:|---:|
|0|蓝方块|20:37:38|1543.75|23.38|-23.38|1543.75|1800|
|1|绿三角|20:37:47|1530.61|8.70|-8.70|1530.61|1807|
|2|紫菱形|20:37:50|1531.06|-8.93|8.93|1531.06|1811|
|3|红叉|20:37:34|1562.53|22.83|-22.83|1562.53|1786|
|4|黄星|20:37:30|1576.35|9.75|-9.75|1576.35|1773|
|5|橙圆|20:37:28|1574.65|-9.91|9.91|1574.65|1771|
|6|月亮|20:37:44|1543.23|-22.78|22.78|1543.23|1803|
|7|骷髅|20:37:41|1563.77|-22.66|22.66|1563.77|1802|

8 标在 23:01:56 移除（源行 3082385–3082392），本次日志中无中途重放，覆盖全部 36 把 M8。界面使用简化手绘形状和中文名称，地面椭圆中心才是精确位置，图标向上悬浮仅为识别。

## 坐标校准

原始世界坐标转 WCL 码单位：`wclX = -worldY`、`wclY = worldX`。API 的 x/y 字段另有 ×100 缩放，使用前除以 100；本地世界坐标不再除以 100。

独立对照：20:53:31.408 的同一次 455489 施法，原始世界坐标 `(1550.98,-19.29)`，WCL 为 `(1929,155098)`。换算后是 `(19.29,1550.98)`。

WCL x 向东、y 向北；SVG y 向下。因此 Boss 朝上时：`screenX = wclX`，`screenY = 2*top + size - wclY`。所有人物、蛋、轨迹、孵化效果与光柱共用这一变换。文字和图标保持正立。

旧代码同时反转 WCL x/y，虽对未校准输入做了数学上的 180° 旋转，最终真实场地却左右镜像。不能用“矩阵是180°”替代场地校验。

地标验证：Boss `(1.23,1599.81)` 应在上方；F1 Logwarlock 拿蛋采样 `(18.25,1555.43)` 与 F3 `(23.11,1551.19)` 应在右侧，与用户实战位置一致。蓝方块/红叉在左，月亮/骷髅在右；绿三角/紫菱形靠下，黄星/橙圆靠上。

## 检查与隐私边界

- 扫描日志是只读操作，不触发游戏 reload、不保存游戏、不读内存。
- 保留8标完整时间区间，不拿无记录的光柱补点，不把单位头顶标记当场地光柱。
- 后续活动重新提取，不能套用这次坐标；历史11月10日未加入这次光柱。
- 仓库仅保存脱敏标记坐标、时间及提取方法，不提交原始大日志、账号目录、GUID、凭据或其他无关内容。
- 发布前验证36场标记数量与位置、左右方向、播放/拖动、生死/孵化、手机布局、历史页面不受污染。

参考：
- https://warcraft.wiki.gg/wiki/API_COMBAT_LOG_EVENT_UNFILTERED （PLACED/REMOVED字段）
- https://warcraft.wiki.gg/wiki/MACRO_worldmarker （世界光柱顺序）
- https://forums.combatlogforums.com/t/world-marker-not-showing-up-in-replay/11667 （开战前放置须完整日志）

## 最小只读提取示例

在本地运行，不写入或修改游戏日志。将路径替换为活动日真实文件：

```python
from pathlib import Path
log = Path("WoWCombatLog-111226_202647.txt")
with log.open(encoding="utf-8", errors="strict") as stream:
    for line_number, line in enumerate(stream, 1):
        if "  WORLD_MARKER_" not in line:
            continue
        timestamp, payload = line.rstrip().split("  ", 1)
        fields = payload.split(",")
        if fields[0] == "WORLD_MARKER_PLACED":
            instance_id, marker = int(fields[1]), int(fields[2])
            world_x, world_y = float(fields[3]), float(fields[4])
            print(line_number, timestamp, "placed", instance_id, marker,
                  "WCL码坐标", -world_y, world_x)
        elif fields[0] == "WORLD_MARKER_REMOVED":
            print(line_number, timestamp, "removed", int(fields[1]))
```

零基索引交叉证据：Wowhead Raid Marker 2（法术84997）的 Change Raid Marker Value=1；Raid Marker 8（171557）Value=7。与 `/wm` 顺序及本地日志0–7范围一致。
- https://www.wowhead.com/spell=84997/raid-marker-2
- https://www.wowhead.com/spell=171557/raid-marker-8
