<template>
  <div class="register">
    <div class="card mt-5 mb-5 register-content">
      <h2 class="mb-4 p-4">Join to Gardens of America</h2>
      <form @submit.prevent="send()" class="p-4">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="first_name">Name</label>
              <input v-model="user.first_name" type="text" class="form-control" id="first_name" required>
            </div>
            <div class="form-group">
              <label for="last_name">Last Name</label>
              <input v-model="user.last_name" type="text" class="form-control" id="last_name" required>
            </div>
            <div class="form-group">
              <label for="direction">Address</label>
              <input v-model="user.address" type="text" name="address" class="form-control" id="direction" required>
            </div>
            <div class="form-group">
              <label for="city">City</label>
              <input v-model="user.city" type="text" name="address" class="form-control" id="city" required>
            </div>
            <div class="form-group">
              <label for="state">State</label>
              <input v-model="user.state" type="text" name="address" class="form-control" id="state" required>
            </div>
            <div class="form-group">
              <label id="countries">Country</label>
              <autocomplete
                  :source="countries"
                  name="countries"
                  @selected="addDistributionGroup"
                  input-class="form-control">
              </autocomplete>
            </div>
            <div class="form-group">
              <label for="postal_code">Postal Code</label>
              <input v-model="user.postal_code" type="text" name="address" class="form-control" id="postal_code"
                     required>
            </div>
            <div class="form-group">
              <label for="phone">Phone</label>
              <input v-model="user.phone" type="tel" name="phone" class="form-control" id="phone" required>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="email-goa">Email</label>
              <input v-model="user.email" type="email" name="email-goa" class="form-control" id="email-goa" required>
            </div>
            <div class="form-group">
              <label for="password1">Password</label>
              <input v-model="user.password" type="password" class="form-control" id="password1"
                     required pattern=".{6,}"
                     onchange="this.setCustomValidity(this.validity.patternMismatch ? 'Minimum of 6 characters' : '');
                   if(this.checkValidity()) form.password_two.pattern = this.value;">
            </div>
            <div class="form-group">
              <label for="password_two">Insert again the password</label>
              <input type="password" class="form-control" id="password_two"
                     required pattern="^\S{6,}$"
                     onchange="this.setCustomValidity(this.validity.patternMismatch ? 'The password not match' : '');">
            </div>
          </div>
        </div>
        <div class="text-right">
          <button type="submit" class="btn btn-primary" :disabled="!!submitForm">Join</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import {successMessage} from "../../utils/handle-message"
  import {handleError, wordEng} from "../../utils/util"
  import {modelUser} from "../../services/model/model-user"
  import {apiCarts, apiUsers, getAxios} from "../../utils/endpoints"
  import {modelCart} from "../../services/model/model-cart"
  import Autocomplete from 'vuejs-auto-complete'
  import {countries} from "../../assets/countries"

  export default {
    name: 'register',
    metaInfo: {
      title: 'Gardens of America',
      titleTemplate: (title) => {
        return `${title} | register`
      }
    },
    components: {Autocomplete},
    data: function () {
      return {
        countries: countries,
        user: modelUser.reset(),
        wordEng: wordEng,
        submitForm: false,
      }
    },
    mounted() {
      document.querySelectorAll('[placeholder="Search"]')[0].required = true;
    },
    methods: {
      addDistributionGroup(info) {
        this.user.country = info.selectedObject.name
        this.user.country_code = info.selectedObject.code
      },
      send() {
        this.user.role_id = 2
        this.submitForm = true
        console.log(JSON.stringify(this.user))
        getAxios(apiUsers.register, 'POST', this.user)
          .then((res) => {
            const cart = modelCart
            cart.user_id = res.data.data.idUser
            getAxios(apiCarts.all, 'POST', cart)
              .then(() => {
                this.submitForm = false
                successMessage(this.$swal, null, this.wordEng.created)
                this.$router.push('login')
              })
              .catch(err => {
                this.submitForm = false
                handleError(this.$swal, err)
              })
          })
          .catch(err => {
            this.submitForm = false
            handleError(this.$swal, err)
          })
      }
    }
  }
</script>

<style scoped lang="scss">
  .register-content {
    max-width: 700px;
    margin: 0 auto;

    h2 {
      border-bottom: 1px solid #e5e5e5;
      padding-bottom: 15px !important;
    }

    .register-user-type {
      margin: 0;

      button {
        border: 1px solid #ececec;
        background-color: #fcfcfc;
        outline: none;
        font-size: 1.4rem;
        padding: 30px;
      }

      button:hover {
        background-color: #f2f2f2;
      }

      button.active {
        background-color: #e3e3e3;
      }
    }

    .register-politics {
      line-height: 2rem;

      a {
        color: #3d7ab1;
      }
    }
  }
</style>
