<script>
import {ref} from "vue";
import HeaderPage from "../headerPage.vue";
import FooterPage from "../footerPage.vue";


export default {
  name: "signupPage",
  components: {FooterPage, HeaderPage,},
  setup() {
    const userInfo = ref({
      email: '',
      name: '',
      password: '',
      passwordConfirm: '',
      mobileNum: '',
    })

    const regex = /^\d{3}-\d{3,4}-\d{4}$/;

    function checkPhoneNumber(value) {
      if (regex.test(value) === true) return true;
      return false;
    }


    return {
      userInfo,
      checkPhoneNumber,

    }
  }

}

</script>

<template>
  <header-page></header-page>
  <form action="" method="post">
    <input type="number" v-model="userInfo.mobileNum" maxlength="11" placeholder="-를 제외하고입력">

    <fieldset>
      <legend>필수입력</legend>
      <div class="container">
        <div>
          <label for="email">email</label>
          <input type="text" id="email" required="required"
                 title="이메일형식에 맞춰주세요 제발"
                 v-model="userInfo.email"/>

        </div>
        <div>
          <label for="name">성함</label>
          <input type="text" id="name" required="required" pattern="/^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,}$/" title="한글2글자 이상 입력해주세요 제발"
                 v-model="userInfo.name"/>
        </div>
        <div>
          <label for="password">비밀번호</label>
          <input type="password" id="password" required="required" v-model="userInfo.password"/>
        </div>
        <div>
          <label for="passwordConfirm">비밀번호 확인</label>
          <input type="password" id="passwordConfirm" required="required" v-model="userInfo.passwordConfirm"/>
        </div>
        <input type="submit" value="회원가입">

        <div class="checkbox_group">

          <input type="checkbox" id="check_all">
          <label for="check_all">전체 동의</label>

          <input type="checkbox" id="check_1" class="normal">
          <label for="check_1">개인정보 처리방침 동의</label>

          <input type="checkbox" id="check_2" class="normal">
          <label for="check_2">서비스 이용약관 동의</label>

          <input type="checkbox" id="check_3" class="normal">
          <label for="check_3">마케팅 수신 동의</label>

        </div>
      </div>
      //이름 번호 주소 성별
    </fieldset>
    <fieldset>
      <legend>부가입력</legend>
      <div>
        <label for="address">거주지를 선택해주세요</label>
        <select name="address" id="address">
          <option value="서울시">서울시</option>
          <option value="경기도">경기도</option>
          <option value="제주도">제주도</option>
        </select>
      </div>
      <div>
        <h2>성별을 입력해주세요.</h2>
        <label for="men">남성</label>
        <input type="radio" id="men" name="gender" value="남성">

        <label for="women">여성</label>
        <input type="radio" id="women" name="gender" value="여성">
      </div>
      <div>
        <h2>관심사항 체크</h2>
        <label for="HTML">나는 캠핑에관심이있다</label>
        <input type="checkbox" id="HTML" name="interest" value="나는 캠핑에관심이있다">
        <label for="CSS">나는 지금 치킨이 먹고싶다</label>
        <input type="checkbox" id="CSS" name="interest" value="나는 지금 치킨이 먹고싶다">
        <label for="SCSS">나는 나다</label>
        <input type="checkbox" id="SCSS" name="interest" value="나는 나다">
      </div>
    </fieldset>
  </form>
  <footer-page></footer-page>
</template>