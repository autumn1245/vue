<template>
    <div>
        <div>
            <van-nav-bar  title="会员中心" />
        </div>
        <div class="top">
           <img src="../../assets/images/login.png" class="top-img" />
        </div>
        <div class="login">
            <div><van-button type="warning" @click="toLogin">注册</van-button></div>
            <div><van-button type="primary" @click="toRegister">登录</van-button></div>
        </div>
        <div>
            <van-cell-group>
                <van-cell title="会员卡" is-link />
                <van-cell title="地址管理" is-link  />
                <van-cell title="我的订单" is-link  />
                <van-cell title="会员权益" is-link />
                <van-cell title="联系我们" is-link  />
            </van-cell-group>

        </div>

    </div>
</template>

<script>
    export default {
        methods:{
            toLogin(){
                this.$router.push({name:'Register'})
            },
            toRegister(){
               this.$router.push({name:'Login'})
            }
        }
    }
</script>

<style scoped>
    .top-img{
        width: 50px;
        height: 50px;
        margin-top: -90px;
        border-radius: 50px;
    }
    .top{
        height:1rem;
        text-align: center;
        padding-top:2rem;
        background-color: #b1a6a8;
    }
    .login{
        display: flex;
        flex-direction: row;
        background-color: #fff;
        padding:10px;
    }
    .login div{
        flex:1;
        text-align: center;
    }
</style>