package com.example.projecttravelplanner.retrofit.auth

import com.example.projecttravelplanner.type.BaseResponse
import com.example.projecttravelplanner.type.auth.LoginResponse
import com.example.projecttravelplanner.type.auth.MeResponse
import com.google.gson.JsonElement
import retrofit2.Call
import retrofit2.http.Field
import retrofit2.http.FormUrlEncoded
import retrofit2.http.GET
import retrofit2.http.POST

interface IAuthRetrofit {
    @GET("/check-connection")
    fun checkConnection(): Call<BaseResponse>

    @FormUrlEncoded
    @POST("/signin")
    fun login(
        @Field("email") email: String,
        @Field("password") password: String): Call<JsonElement>

    @FormUrlEncoded
    @POST("/signup")
    fun signUp(
            @Field("email") email: String,
            @Field("name") username: String,
            @Field("password") password: String,
            @Field("passwordConfirm") passwordConfirm: String,
            @Field("phone") phone: String
    ): Call<JsonElement>

    @FormUrlEncoded
    @POST("/me")
    fun me(): Call<MeResponse>
}