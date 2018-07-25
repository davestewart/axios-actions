<template>
  <article>

    <div class="content">
      <h2 class="title is-2">Fieldset example</h2>
      <blockquote>
        <p>Demo uses manually-created computed properties, accessing the store via getters and actions</p>
        <edit-code src="examples/large/VueComputedFull.vue"/>
        <edit-code src="examples/large/vuex/vuex-full.js"/>
      </blockquote>
    </div>

    <div class="columns">
      <fieldset class="column">
        <ui-input label="First Name" v-model="firstName"/>
        <ui-input label="Last Name" v-model="lastName"/>
        <ui-input label="Email" v-model="email"/>
        <ui-input label="Website" v-model="website"/>
        <ui-input label="Phone" v-model="phone"/>
      </fieldset>

      <fieldset class="column">
        <ui-input label="Street" v-model="street"/>
        <ui-input label="Area" v-model="area"/>
        <ui-input label="Town" v-model="town"/>
        <ui-input label="Zipcode" v-model="zipcode"/>
        <ui-input label="Country" v-model="country"/>
      </fieldset>
    </div>

  </article>

</template>

<script>
  export default {

    data () {
      return {
        firstName: '',
        lastName: '',
        email: '',
        website: '',
        phone: '',
        street: '',
        area: '',
        town: '',
        zipcode: '',
        country: '',
      }
    }
  }
</script>
