package com.example.projecttravelplanner.retrofit.auth

import com.example.projecttravelplanner.type.BaseResponse
import com.example.projecttravelplanner.type.auth.LoginResponse
import com.example.projecttravelplanner.type.auth.MeResponse
import retrofit2.Call
import retrofit2.http.FormUrlEncoded
import retrofit2.http.GET
import retrofit2.http.POST

interface IAuthRetrofit {
    @GET("/check-connection")
    fun checkConnection(): Call<BaseResponse>

    @FormUrlEncoded
    @POST("/login")
    fun login(email: String, password: String): Call<LoginResponse>

    @FormUrlEncoded
    @POST("/signup")
    fun signUp(
            email: String,
            username: String,
            password: String,
            passwordConfirm: String,
            phone: String
    ): Call<BaseResponse>

    @FormUrlEncoded
    @POST("/me")
    fun me(): Call<MeResponse>
}