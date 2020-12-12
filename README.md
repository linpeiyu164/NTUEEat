## `Backend`

### `ImageForm`
這個是我之前在測後端的時候做的前端～

改一改應該就可以跟後端連接ㄌ
* 前端傳照片給後端：轉成base64才傳給後端
* 後端傳照片給前端：上傳之後存下url，所以前端顯示的時候只需要秀出url就可以ㄌ

### `yarn server`
***我把前後端分開了喔喔喔
要跑server要進去server資料夾喔～***
### `.env 裡面需要加上`
* MONGO_URL=
* CLOUD_NAME=
* CLOUD_API_KEY=
* CLOUD_API_SECRET=
### `model`
* Store.js

    價位的儲存方法是
    
    第一等級：[1, 0, 0]

    第二等級：[0, 1, 0]

    第三等級：[0, 0, 1]

* User.js
### `core`
+ functions.js

    我把價位的計算方式改成利用最高和最低的平均來估計價位，因為感覺有的店家會有小菜就超便宜，但是不代表這家店真的很便宜？可以再討論～

### `routes`
+ stores.js
    
    ***comments部分改去index.js裡面做（利用websocket)***
+ users.js

## `FrontEnd`
+ Map.css 
+ StoreMap.js

    單一店家右側的地圖，目前只會顯示該店家的
    1. location : 地址
    2. coordinates : [longtitude, latitude]
    3. storename : 店家名稱

    都是當作props傳進去。
    目前測試傳進去固定的東西是成功的，變動的props沒有測試過。

    + 然後用CircleMarker是因為Marker不能用，可能是因為他剛剛更新版本，有些東西爛掉ㄌ
