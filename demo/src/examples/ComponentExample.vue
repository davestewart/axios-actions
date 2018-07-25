<template>
  <article>

    <div class="content">
      <h2 class="title is-2">Component example</h2>
      <blockquote>
        <p>Demo uses one and two-way computed properties, state, getters and commits, object and array syntax</p>
        <edit-code src="examples/typical/VueComputed.vue"/>
        <edit-code src="examples/typical/vuex/vuex-light.js"/>
      </blockquote>
    </div>

    <div class="controls field is-horizontal">
      <ui-select label="Language"
                 options="JavaScript PHP Ruby Python CSS Go"
                 v-model="language"/>
      <ui-select label="Type"
                 options="framework library toolkit utility state data CMS graph game"
                 prompt="Any"
                 v-model="type"/>
      <ui-select label="Sort key"
                 options="stars name author license"
                 v-model="sortKey"/>
      <ui-select label="Sort order"
                 options="asc desc"
                 v-model="sortOrder"/>
      <ui-input label="Keyword"
                v-model="keyword"/>
    </div>

    <div>Content</div>


  </article>
</template>

<script>
export default {

  data () {
    return {
      language: '',
      type: '',
      sortKey: '',
      sortOrder: '',
      keyword: '',
    }
  },

}
</script>
