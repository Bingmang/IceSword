<template>
  <div>
    <div id="container" v-comment:id="ArticlesId"></div>
  </div>
</template>

<script>
import Gitment from '../assets/gitment/gitment.js'
import '../assets/gitment/default.css'
export default {
  props: ['ArticlesId'],
  data() {
    return {

    }
  },
  mounted() {

  },
  directives: {
    comment: {
      bind: function(el, binding) {
        const myTheme = {
          render(state, instance) {
            const container = document.createElement('div')
            container.lang = "en-US"
            container.className = 'gitment-container gitment-root-container'
            // container.appendChild(instance.renderHeader(state, instance))
            container.appendChild(instance.renderEditor(state, instance))
            container.appendChild(instance.renderComments(state, instance))
            // container.appendChild(instance.renderFooter(state, instance))
            return container
          },
        }
        var gitment = new Gitment({
          id: binding.value,
          owner: 'Bingmang',
          repo: 'IceSword-Comments',
          oauth: {
            client_id: '32a333481233d96d3fdd',
            client_secret: '4bf96ae62952f9916fb700cd3a5e894d295de43c',
          },
          theme: myTheme
        })
        gitment.render(el)

      }
    }
  }
}
</script>

<style scoped>

</style>