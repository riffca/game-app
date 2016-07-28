<template>
	  <brand-root></brand-root>
    <router-view></router-view>
</template>

<script>
//helper
import jsonHelper from 'help/json';

//html части
import BrandRoot from './brand-root';

//классы
import App from 'class/app';
import User from 'class/user';

export default {
  replace: false,
  components:{
    BrandRoot
  }, 
  data () {
    return {
      app: ''
    };
  },

  asyncData(resolve, reject){
    /**
    /*
    /*Создаем приложение
    /*
    */
    let app = new App();
    logger('Create App object',()=>{
      console.log(jsonHelper(app));
    })
    /**
    /*
    /*Получаем юзера
    /*
    */
/*    app.getAuthUser().then(resData=>{

        //not auth unknown user
        if(!resData.success){
          let user = app.user;
          resolve({
            app: app,
            user: user
          })
          logger('Create User object',()=>{
            console.log(jsonHelper(user));
          })
          return;
        }

        //auth user
        let user = new User(resData.user);
        app.user = user.id;
        resolve({
            app: app,
            user: user
        })
        logger('Create User object',()=>{
            console.log(jsonHelper(user));
        })
    })*/
  }
};
</script>

<style lang="sass">
</style>