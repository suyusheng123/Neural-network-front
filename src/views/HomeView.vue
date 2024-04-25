<template>
  <div class="phone-number-lookup">
    <h2>手机号码归属地查询</h2>
    <div class="input-area">
      <el-input v-model="phoneNumber" placeholder="请输入手机号码" @input="handleInput" type="number"/>
      <el-button type="primary" @click="lookup">查询</el-button>
    </div>
    <div v-if="error" class="error">
      <p>请输入有效的11位手机号码</p>
    </div>
    <div v-else>
      <div v-if="start" class="result">
        <p>运营商：<strong>{{ operator }}</strong></p>
      </div>
      <div v-else class="result" v-loading="loading">
        <p>手机号：<strong>{{ phoneNumber }}</strong></p>
        <p>归属地：<strong>{{ location }}</strong></p>
        <p>运营商：<strong>{{ operator }}</strong></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {queryLocation,} from '@/api/queryPhone.js'
import { ref } from 'vue'

const phoneNumber = ref(null)
const loading = ref(false)
const error = ref(false)
const operator = ref(null)
const location = ref(null)
const start = ref(true)
const chinaMobile = ref(['134', '135', '136', '137', '138', '139', '147', '148', '150', '151', '152', '157', '158', '159', '172', '178', '182', '183', '184', '187', '188', '195', '198'])
const chinaUnicom = ref(['130', '131', '132', '145', '146', '155', '156', '166', '167', '171', '175', '176', '185', '186', '196'])
const chinaTelecom = ref(['133', '149', '153', '173', '174', '177', '180', '181', '189', '190', '191', '193', '199'])
const chinaRadio = ref(['192'])

const handleInput = () => {
  error.value = false
  if (phoneNumber.value.length >= 3) {
    const prefix = phoneNumber.value.substr(0, 3)
    if (chinaMobile.value.includes(prefix)) {
      operator.value = '移动'
    } else if (chinaUnicom.value.includes(prefix)) {
      operator.value = '联通'
    } else if (chinaTelecom.value.includes(prefix)) {
      operator.value = '电信'
    } else if (chinaRadio.value.includes(prefix)) {
      operator.value = '广电'
    } else {
      operator.value = '运营厂未知，请检查输入是否正确'
    }
  } else {
    operator.value = ''
  }
}

const lookup = async () => {
  if (!phoneNumber.value || phoneNumber.value.length !== 11) {
    error.value = true
    return
  }
  loading.value = true
  try {
    const { data } = await queryLocation(phoneNumber.value)
    operator.value = data.data.originalIsp
    location.value = data.data.area
    start.value = false
    loading.value = false
  } catch (err) {
    loading.value = false
  }
}

</script>

<style scoped>
.phone-number-lookup {
  max-width: 600px;
  margin: 0 auto;
}

.input-area {
  display: flex;
  margin-bottom: 20px;
}

.loading,
.error {
  margin-bottom: 20px;
  color: red;
}

.result {
  background-color: #f5f5f5;
  padding: 10px;
}
</style>
