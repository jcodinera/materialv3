<template>
    <div class="login-page">
        <div class="login-box">
            <div class="card">
                <div class="card-header bg-gradient-primary"></div>
                <div class="card-body login-card-body">
                    <p class="login-box-msg"><span class="text-bold">Login</span> to start your session</p>

                    <form @submit.prevent="login">
                        <div class="input-group mb-3">
                            <input type="email" class="form-control" placeholder="Email" name="email" v-model="form.email"
                                   :class="{'is-invalid': form.errors.has('email')}">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-envelope"></span>
                                </div>
                            </div>
                            <has-error :form="form" field="email"></has-error>
                        </div>
                        <div class="input-group mb-3">
                            <input type="password" class="form-control" placeholder="Password" name="password" v-model="form.password"
                                   :class="{'is-invalid': form.errors.has('password')}">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                            <has-error :form="form" field="password"></has-error>
                        </div>
                        <button type="submit" class="btn btn-primary btn-block" :disabled="form.busy">Sign In</button>
                    </form>

                    <div class="text-center mt-3">
                        <p class="mb-0">
                            <router-link :to="{name: 'register'}" class="text-center">Register a new membership</router-link>
                        </p>
                    </div>
                </div>
                <!-- /.login-card-body -->
            </div>
        </div>
        <!-- /.login-box -->
    </div>
</template>

<script>
    import Form from "vform/src/Form";

    export default {
        data() {
          return {
            form: new Form({
                email: '',
                password: ''
            })
          }
        },
        methods: {
            login() {

            }
        }
    }
</script>
