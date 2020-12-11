## `backend`

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
+ users.js
