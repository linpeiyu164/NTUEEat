# [109-1] Web Programming Final

### `專題名稱 : (Group 47) NTUEEat` 
### `作者： 林郁敏 陳柏如 林霈瑀`
### `deploy link`
* link : 

### `demo link`
* link : 

### `服務內容` 

這個服務是一個台大附近的食物的評價網，比起直接在google搜尋，我們希望完成一個主要由台大學生新增及評論的美食地圖，除了評論較貼近學生們的想法外，一些google地圖上搜尋不到的小店家也能被包括進來，提供學生更多用餐選擇。主要功能有：
* 新增店家進入資料庫
* 在店家留下評價
* 瀏覽店家資訊、位置
* 計算店家與目前位置的距離
* 篩選與搜尋想要瀏覽的範圍
* 新增喜愛的店家
* 隨機抽選餐廳


### `使用、操作方式`
* 透過篩選器及查詢欄查詢喜歡的餐廳，點選餐廳名稱得到更詳細的餐廳資訊。
* 註冊新帳號方式：點選右上角Login後，分別填入帳號及密碼欄，先點選Register再點選Login，即註冊完成且登入。
* 帳號註冊完後，下次登入只需點選Login即可
* 登入後新增紀錄喜愛餐廳及評論餐廳功能
* 右上角還有新增餐廳及隨機抽取餐廳功能，操作簡單直覺。
* 其餘細節demo影片中會呈現

### `其他說明`
我們專題只有象徵性的輸入個第幾間餐廳作為代表，如要永續經營會再輸入更多的餐廳。

#### `features` :
* 可以及時的將店家的地址去網路上爬到座標，並且回傳顯示於地圖。
* 可以定位使用者，並且估算使用者與店家的距離。
* local authentication
* fuzzy search搜尋店家名稱

### `Optional 如果願意開源GitHub Link`
temporarily No

### `使用與參考之框架/模組/原始碼`
***主要框架***
* Backend : Express/ Node.js/ MongoDB 
* FrontEnd : ReactJS/ Axios

### `專題製作心得`
##### 一開始我們預期期末考結束後的時間不夠完成專題，便在12月初開始建構我們的專題，
##### 完成了大部分後端及部分前端，並隨著考試到來慢慢停下腳步。但是當期末考後，開始
##### 繼續製作專題時還是遇到非常多超乎預期的 bug，花費相當多的時間處理bug，完成這

##### 個專題。雖然花費了數天從早到晚的時間，但在製作這個專題的過程中對於react的概
##### 念更佳嫻熟了，前後端的相互呼叫、應用更加熟悉;也學習到新增更多套件完成更多元的
##### 功能，收穫實在良多。
##### 我們也發現之前覺得稀鬆平常的一些功能，其實真的寫起來並沒有很容易。

### `使用的第三方套件`
* React.js
* Node.js
* Mongo DB
* beautiful soup
* material-ui
* selenium
* heroku

***npm packages***
* bcrpyt : 加密
* passport/passport-local/express-session/express-flash : authentication
* react-leaflet/react-geolocated : 地圖與定位處理
* mongoose-fuzzy-searching : 增加fuzzy-search店家名稱的功能
* cloudinary : 額外的database來存放照片（空間較大）


***參考開源程式碼***
* child-process 資料夾 : 使用開源程式碼
* RankStar.js : 使用開源程式碼  github Link :https://github.com/mykurisu/mykurisu-demo/blob/master/evaluation/WKRateStar.js
* selenium + beautifulsoup4 爬蟲： https://medium.com/hybrid-maker/ubuntu-%E5%AE%89%E8%A3%9D%E6%9C%80%E6%96%B0%E7%89%88node-npm-%E4%BB%A5%E5%8F%8A%E4%BF%AE%E6%94%B9npm-sudo%E6%AC%8A%E9%99%90-4404d1c4b039

### `分工`
* 林郁敏 ： （前端）地圖、店家詳細資訊頁面、新增店家表單
* 陳柏如 ： （前端）首頁、Navbar、新增喜愛店家
* 林霈瑀 ： （後端）database、地圖、Login、Main、個人界面