<template>
  <div>
    <h1 class="text-center mb-3">Guide Gardens of America</h1>
    <table class="table table-striped">
      <thead>
      <tr>
        <th scope="col" width="10px">Nº</th>
        <th scope="col">Title</th>
        <th scope="col" width="10"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(guide, index) of guides" :key="guide.image">
        <th scope="col">{{++index}}</th>
        <td>{{guide.title}}</td>
        <td>
          <button class="btn btn-sm btn-primary" @click.prevent="openModal(guide)">
            {{wordEng.show}}
          </button>
        </td>
      </tr>
      </tbody>
    </table>

    <vue-modaltor :visible="open" @hide="hideModal">
      <template slot="close-icon">
        <CloseImageSVG/>
      </template>
      <h2 class="text-center mb-3">{{guide.title}}</h2>
      <img :src="guide.image" alt="help 1" class="img-fluid">
      <div class="p-3">
        <p v-html="guide.content"></p>
      </div>
    </vue-modaltor>

  </div>
</template>

<script>
  import CloseImageSVG from "../../components/CloseImageSVG"
  import {wordEng} from "../../utils/util"

  export default {
    name: "Guide",
    metaInfo: {
      title: 'Gardens of America cPanel',
      titleTemplate: (title) => {
        return `${title} | Guide`
      }
    },
    components: {CloseImageSVG},
    data() {
      return {
        open: false,
        wordEng: wordEng,
        guide: {},
        guides: [
          {
            title: 'Home',
            image: require('../../assets/img/Guide/01-home.jpg'),
            content: 'Information of clients'
          },
          {
            title: 'Profile cPanel',
            image: require('../../assets/img/Guide/02.Profile.jpg'),
            content: 'Information of clients'
          },
          {
            title: 'Clients',
            image: require('../../assets/img/Guide/03.Client.jpg'),
            content: 'Information of clients'
          },
          {
            title: 'Information of Client',
            image: require('../../assets/img/Guide/04.Client-show.jpg'),
            content: 'Information of clients'
          },
          {
            title: 'Products',
            image: require('../../assets/img/Guide/05.Products.jpg'),
            content: 'Information of clients'
          },
          {
            title: 'Information of Product',
            image: require('../../assets/img/Guide/06.Detail Products.jpg'),
            content: 'Information of clients'
          },
          {
            title: 'Categories of Product',
            image: require('../../assets/img/Guide/07.Categories.jpg'),
            content: 'Information of clients'
          },
          {
            title: 'Images of Product - Part 1',
            image: require('../../assets/img/Guide/08.Images.jpg'),
            content: 'Information of clients'
          },
          {
            title: 'Images of Product - Part 2',
            image: require('../../assets/img/Guide/09.Images.jpg'),
            content: 'Information of clients'
          },
          {
            title: 'Categories',
            image: require('../../assets/img/Guide/10.Categories.jpg'),
            content: 'Information of clients'
          },
          {
            title: 'Detail of Category',
            image: require('../../assets/img/Guide/11.Category.jpg'),
            content: 'Information of clients'
          },
          {
            title: 'Reviews',
            image: require('../../assets/img/Guide/12.Reviews.jpg'),
            content: 'Information of clients'
          },
          {
            title: 'Detail of Review',
            image: require('../../assets/img/Guide/13.Reviews.jpg'),
            content: 'Information of clients'
          },
          {
            title: 'Orders',
            image: require('../../assets/img/Guide/14.Orders.jpg'),
            content: 'Information of clients'
          },
          {
            title: 'Detail of Order',
            image: require('../../assets/img/Guide/15.Order.jpg'),
            content: 'Information of clients'
          },
          {
            title: 'Users',
            image: require('../../assets/img/Guide/16.Users.jpg'),
            content: 'Information of clients'
          },
          {
            title: 'Detail of User',
            image: require('../../assets/img/Guide/17.User.jpg'),
            content: 'Information of clients'
          },
          {
            title: 'Newsletter emails',
            image: require('../../assets/img/Guide/18.Emails.jpg'),
            content: 'Information of clients'
          },
          {
            title: 'Payments',
            image: require('../../assets/img/Guide/19.Payments.jpg'),
            content: 'Information of clients'
          },
        ]
      }
    },
    methods: {
      openModal(guide) {
        this.open = true
        this.guide = guide
      },
      hideModal() {
        this.open = false
      },
    },
  }
</script>

<style scoped>
  h1 {
    font-size: 2.2rem;
  }

  p {
    color: #515151;
  }

  img {
    width: 100%;
  }

  .modal-vue .modal-vue-show {
    width: 90%;
  }
</style>
