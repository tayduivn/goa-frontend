<template>
  <footer>
    <div class="foot-email">
      <form class="email-box" @submit.prevent="sendSuscribe">
        <p>Sign up for our newsletter and be the first to know about our new products.</p>
        <div class="email-info">
          <p>Keep in touch</p>
          <input id="email" type="email" placeholder="your email address" v-model="user.email">
          <button type="submit" class="global-button transparent">submit</button>
        </div>
      </form>
    </div>
    <div class="foot-social">
      <div class="social-box">
        <div class="social-payment-content">
          <div class="payment-content">
            <h4>Payment methods</h4>
            <div class="payment-image">
              <!--<img src="./../assets/img/Footer/Amazon_icon.jpg" alt="amazon logo">-->
              <img src="./../assets/img/Footer/American_Express_icon.jpg" alt="american express logo">
              <!--<img src="./../assets/img/Footer/Pay_icon.jpg" alt="apple logo">-->
              <img src="./../assets/img/Footer/Discover_icon.jpg" alt="discover logo">
              <img src="./../assets/img/Footer/JCB_icon.jpg" alt="JCB logo">
              <img src="./../assets/img/Footer/MasterdCard_icon.jpg" alt="mastercard logo">
              <img src="./../assets/img/Footer/PayPal_icon.jpg" alt="paypal logo">
              <img src="./../assets/img/Footer/Visa_icon.jpg" alt="visa logo">
            </div>
          </div>
          <div class="social-content">
            <a href="https://www.facebook.com/">
              <img src="../assets/img/Footer/Facebook_icon.jpg" alt="facebook logo">
            </a>
            <a href="https://www.facebook.com/">
              <img src="./../assets/img/Footer/Instagram_icon.jpg" alt="instagram logo">
            </a>
            <a href="https://www.facebook.com/">
              <img src="./../assets/img/Footer/Twitter_icon.jpg" alt="twitter logo">
            </a>
          </div>
        </div>
        <div class="social-foot">
          <img src="./../assets/img/Footer/Logo_GoA_Footer.jpg" alt="goa logo">
          <p>Terms & Conditions Privacy � Copyright - All Rights Reserved, Gardens of America 2019</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
  import {apiEmails, getAxios} from "../utils/endpoints"
  import {successMessage} from "../utils/handle-message"
  import {handleError} from "../utils/util"

  export default {
    name: 'Footer',
    data() {
      return {
        user: {
          email: ''
        }
      }
    },
    methods: {
      sendSuscribe() {
        getAxios(apiEmails.allPublic, 'POST', this.user)
          .then(() => {
            successMessage(this.$swal)
          })
          .catch(err => {
            handleError(this.$swal, err)
          })
      }
    },
  }
</script>
