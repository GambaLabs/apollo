<template>
  <div flex flex-col gap-4>
    <NCard p-4>
      <div class="n-header-upper">
        File upload Example
      </div>

      <div class="flex flex-wrap gap-3 items-center">
        <input type="file" name="file" id="file" ref="fileRef" />
        <NButton @click="uploadFile">
          Upload File
        </NButton>
        <NButton @click="uploadFileAsBlob">
          Upload File with Blob
        </NButton>
      </div>
    </NCard>

    <NCard p-4>
      <div class="n-header-upper">
        Raw Output
      </div>

      <pre v-if="data">{{ data }}</pre>
    </NCard>
  </div>
</template>

<script lang="ts" setup>
const uploadAvatarMutation = gql`
  mutation uploadAvatar($file: Upload!) {
    uploadAvatar(file: $file) {
      user_avatar
      full_url
    }
  }
`
const data = ref<any>(null)
const fileRef = ref<any>(null)

const { mutate, onDone } = useMutation(uploadAvatarMutation, { clientId: 'gamba' })

function uploadFile () {
  const file = fileRef.value.files[0]
  mutate({
    file
  })
}

function uploadFileAsBlob () {
  const file = fileRef.value.files[0]
  const reader = new FileReader()
  reader.onload = function (e: any) {
    const blob = new Blob([new Uint8Array(e.target.result)], { type: file.type })

    mutate({
      file: blob
    })
  }
  reader.readAsArrayBuffer(file)
}

onDone((result) => {
  data.value = result
})
</script>
