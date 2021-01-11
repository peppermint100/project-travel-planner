package com.example.projecttravelplanner.retrofit

import android.util.Log
import com.example.projecttravelplanner.utils.API
import com.example.projecttravelplanner.utils.SharedPreferenceManager
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.Response
import okhttp3.logging.HttpLoggingInterceptor
import okio.IOException
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object RetrofitClient {
    private val TAG: String = "로그"
    private var retrofitClient: Retrofit? = null

    fun getClient(baseUrl: String): Retrofit? {
        val client = OkHttpClient.Builder()

        val loggingInterceptor = HttpLoggingInterceptor(object: HttpLoggingInterceptor.Logger{
            override fun log(message: String) {
                Log.d(TAG, "RetrofitClient - log: $message ");
            }
        })


        loggingInterceptor.setLevel(HttpLoggingInterceptor.Level.BODY)

        client.addInterceptor(loggingInterceptor)
        client.addInterceptor(object : Interceptor {
            override fun intercept(chain: Interceptor.Chain): Response {
                val currentRequest = chain.request().newBuilder().addHeader(API.TOKEN_HEADER, SharedPreferenceManager.getToken()).build()
                return chain.proceed(currentRequest)
            }
        })

        if(retrofitClient == null){
            retrofitClient = Retrofit.Builder()
                    .baseUrl(baseUrl)
                    .addConverterFactory(GsonConverterFactory.create())
                    .client(client.build())
                    .build()
        }

        return retrofitClient
    }
}