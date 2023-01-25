<template>
  <input type="file" name="file-to-upload" @change="fileChange" />
  <input type="submit" value="Upload" />
</template>

<script>
export default {
  name: 'upload',
  data() {
    return {
      file: null,
    }
  },
  methods: {
    fileChange() {},
  },
}
</script>
