<template>
  <p class="slogan">
    /* <span class="typed-quotes">{{ slogan }}</span>
    <span class="typed-cursor">|</span> */
  </p>
</template>

<script>
import { sleep } from '~utils/index'

export default {
  props: {
    slogans: {
      type: Array,
      default: ['pass', 'some slogans'],
    },
  },

  data () {
    return {
      slogan: '',
      timeInterval: -1,
      playTimes: 999999,
    }
  },

  mounted () {
    this.play()
  },

  methods: {
    async _play () {
      const ctx = this
      const playText = async function (text, speed, read) {
        function readText (n, sp) {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              ctx.slogan = read(text, n)
              resolve()
            }, sp)
          })
        }

        let length = 0
        while (length++ <= text.length) {
          await readText(length, speed(length))
        }
      }

      for (const text of ctx.slogans) {
        await playText(
          text,
          n => {
            const sp = 150 - 2 * n * n
            return sp < 0 ? 80 : sp
          },
          (t, n) => t.slice(0, n)
        )
        await sleep(500)
        await playText(
          text,
          n => {
            const sp = 200 - 3 * n * n
            return sp < 0 ? 30 : sp
          },
          (t, n) => t.slice(0, -n)
        )
      }
    },

    async play () {
      while (this.playTimes-- > 0) {
        await this._play()
      }
    },

  },
}
</script>
