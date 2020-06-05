<template>
    <div class="register-page">
        <div class="register-box">
            <div class="card">
                <div class="card-header bg-gradient-primary"></div>
                <div class="card-body register-card-body">
                    <p class="login-box-msg"><span class="text-bold">Register</span> a new membership</p>

                    <form @submit.prevent="register">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Name" name="name" v-model="form.name"
                                   :class="{'is-invalid': form.errors.has('name')}">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-user"></span>
                                </div>
                            </div>
                            <has-error :form="form" field="name"></has-error>
                        </div>
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
                            <input type="password" class="form-control" placeholder="Password" v-model="form.password"
                                   :class="{'is-invalid': form.errors.has('password')}">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                            <has-error :form="form" field="password"></has-error>
                        </div>
                        <button type="submit" class="btn btn-primary btn-block">Register</button>
                    </form>
                    <div class="text-center mt-3">
                        <p class="mb-0">
                            <router-link :to="{name: 'login'}" class="text-center">I already have a membership</router-link>
                        </p>
                    </div>
                </div>
                <!-- /.form-box -->
            </div><!-- /.card -->
        </div>
    </div>
</template>

<script>
    import Form from 'vform'

    export default {
        data() {
            return {
                form: new Form({
                    name: '',
                    email: '',
                    password: ''
                })
            }
        },
        methods: {
            register() {

            }
        }
    }
</script>
