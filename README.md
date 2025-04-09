<h1>
  ขอบเขตของ Project
</h1>
<p>
  WebSite สำหรับขายสินค้าอิเล็กทรอนิกส์ โดยผู้ใช้สามารถเลือกซื้อสินค้าได้ตามใจชอบตามความต้องการของตนเอง โดยมีFeatureตามรายละเอียดดังนี้
</p>
<ul>
  <li>
    การสร้างบัญชีผู้ใช้และลงทะเบียนใช้งานของ User
  </li>
  <li>
    ระบบตะกร้าสินค้า
  </li>
  <li>
    ระบบการจัดการสินค้าสำหรับ Admin
  </li>
  <li>
    การแสดงข้อมูลสินค้า
  </li>
  <li>
    การค้นหาสินค้า
  </li>
</ul>
 <h1>
  การแบ่งงาน
</h1>
<table>
  <tr>
    <td> สมาชิก </td>
    <td> สิ่งที่รับผิดชอบ</td>
  </tr>
  <tr>
    <td>66130500105 Varis Nithiparkorn (30%)</td>
    <td> - Create User Account<br>
    - Login if user already have an account<br>
    - User can edit own information like address, name, phone and email</td>
  </tr>
  <tr>
    <td>66130500109<br> Kritsada Atchariyapruk (40%)</td>
    <td>
    - Header(search bar,จำนวนของในตะกร้า)<br>
    - หน้าตะกร้าสินค้า(ลบเพิ่มจำนวนสินค้าในตะกร้า)<br>
    - หน้าadmin (crud)</td>
  </tr>
  <tr>
    <td>66130500124<br> Phusara Khadseela (30%)</td>
    <td> - การแสดงข้อมูลสินค้า  <br>
    - List สินค้าในหน้า Home <br>
    - Filler สินค้า <br>
</td>
  </tr>
</table>
<h1>
  ความคืบหน้า
</h1>
<table>
  <tr>
    <td> สมาชิก </td>
    <td> Week2</td>
    <td> Week3</td>
    <td> Week4</td>
    <td> Week5</td>
  </tr>
  <tr>
    <td>66130500105 Varis Nithiparkorn </td>
    <td> - Ui design in Loginform<br> - event click and input handler in inputField<br>   </td>
    <td> - update responsive login ui<br> -Ui design sign up form<br> -add UserRegister and sign up component</td>
    <td> - CreateOrAuthAccount component use to create and auth input of user<br> -logic to validate input from user </td>
    <td> - Add profile page<br> - add feature edit account info in profile page<br> - add router path in login page and profile page</td>
  </tr>
  <tr>
    <td>66130500109<br> Kritsada Atchariyapruk</td>
    <td>- Header component </td>
    <td>- 3 Cart components for cart page  <br>- Update header search bar search by product name from db </td>
    <td>- Admin page (listing product,remove product)<br>- Payment page <br>- Update 3 cart components<br>- Add Home page<br>- Add router to home,cart,payment page </td>
    <td>- Admin page(add,edit)<br>- update search bar<br>- add cart&product state<br>- update cart component</td>
  </tr>
  <tr>
    <td>66130500124<br> Phusara Khadseela</td>
    <td>- List Product Function </td>
    <td>- Filter UI <br> - Simple Check Filter Function </td>
    <td>- Product Detail UI <br> - Filter Function <br> - Add to cart Function </td>
    <td>- Update function add to cart <br>
-Add rounter to ProductDetail <br> - Update productSection.vue to use store form cart <br> - Add mapping image file for productdetail
 </td>
  </tr>
</table>

<h1>คู่มือการใช้งาน</h1>
<img src="./src/assets/guides/regis1.png" width="800" height="500">
<p>
1. ก่อนเริ่มต้นการใช้งาน ผู้ใช้จำเป็นต้องมี account ของตนเองก่อนเริ่มใช้งาน
 หากมีอยู่แล้วสามารถ กรอก username หรือ email บนแถบ username และใส่ password ให้ถูกต้อง</p>
<p>
 1.2 หากผู้ใช้ยังไม่มี account เป็นของ ตนเอง สามารถ sign up และ กรอกข้อมูลส่วนตัวเพื่อสร้างบัญชีผ้ใช้ของตัวเองได้ ตามรูปดังนี้
</p>
<img src="./src/assets/guides/regis2.png" width="800" height="500"><br>
<img src="./src/assets/guides/regis3.png" width="800" height="500"><br>
<img src="./src/assets/guides/home1.png" width="800" height="500">
<p>
2. เมื่อผู้ใช้ login สำเร็จจะพบหน้า hompage ที่แสดงสินค้าทั้งหมดบน website และผู้ใช้สามารถหาสินต้าที่จต้องการจากชื่อ หรือ ประเภทสินค้าได้ตามรูป
</P>
<img src="./src/assets/guides/home2.png" width="800" height="500">
<p>
2.2 หากผู้ใช้ต้องการดูรายละเอียดสินค้าเพิ่มเติม สามารถ คลิกที่สินค้านั้นๆ และจะเข้าไปยังหน้า รายละเอียดสินค้า และบอกรายละเอียดทั้งหมดเกี่ยวกับสินค้าชิ้นนั้น และหากต้องการซื้อสินค้าชิ้นนั้นสามารถ คลิก เพิ่มลงตะกร้า เพื่อไปยังหน้าชำระเงินได้
</p>
<img src="./src/assets/guides/cart1.png" width="800" height="500">
<p>
3. หลังจากผู้ใช้เพิ่มสินค้าลงตะกร้าแล้ว สามารถตรวจสอบสินค้า อย่างจำนวนชิ้น ราคา ราคารวมของสินค้าทุกชิ้น ได้ 
</p>
<p>
3.2 หากต้องการแก้ไขจำนวนสินค้า สามารภเพิ่มลดได้ หรือ คลิกปุ่ม edit เพื่อทำการแก้ใขได้ ดังรูป
</p>
<img src="./src/assets/guides/cart2.png" width="800" height="500"><br>
<img src="./src/assets/guides/purchase1.png" width="800" height="500">
<p>
4. หากผู้ใช้ยืนยันสินค้าและกดชำระเงิน จะเข้าสูหน้าการชำระเงิน ผู้ใช้จำเป็นต้อง เพิ่มที่อยู่สำหรับรับสินค้าให้เรียบร้อย และคลิกชำระเงินเพื่อจบคำสั่งซื้อ
</p>
<h1>
  คลิปสาธิต features
</h1>
https://www.youtube.com/watch?v=KF11AWcn0_g
<h1>
  Components diagram
</h1>
<img src="./src/assets/componentsDiagram/diagram.png" width="800" height="500"><br>
<h2>
  AccountProfile page
</h2>
<img src="./src/assets/componentsDiagram/accountprofilediagram.png" width="800" height="500"><br>
<h2>
  Admin page
</h2>
<img src="./src/assets/componentsDiagram/admindiagram.png" width="800" height="500"><br>
<h2>
  Cart page
</h2>
<img src="./src/assets/componentsDiagram/cartDiagram.png" width="800" height="500"><br>
<h2>
  Home page
</h2>
<img src="./src/assets/componentsDiagram/hompageDiagram.png" width="800" height="500"><br>
<h2>
  Register page
</h2>
<img src="./src/assets/componentsDiagram/logindiagram.png" width="800" height="500"><br>
<h2>
  Payment page
</h2>
<img src="./src/assets/componentsDiagram/paymentdiagram.png" width="800" height="500"><br>

<h1>อ้างอิง</h1>
<p>
ข้อมูล,รูปภาพสินค้า - ihavecpu (https://ihavecpu.com/)
</p>
