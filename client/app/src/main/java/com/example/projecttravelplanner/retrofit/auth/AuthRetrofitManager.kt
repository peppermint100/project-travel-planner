package com.example.projecttravelplanner.retrofit.auth
import com.example.projecttravelplanner.retrofit.RetrofitClient
import com.example.projecttravelplanner.type.BaseResponse
import com.example.projecttravelplanner.type.auth.MeResponse
import com.example.projecttravelplanner.type.auth.SuspendedLoginResponse
import com.example.projecttravelplanner.utils.API.BASE_URL
import com.example.projecttravelplanner.utils.SharedPreferenceManager
import com.google.gson.JsonObject
import retrofit2.awaitResponse

class AuthRetrofitManager {

    companion object {
        val instance = AuthRetrofitManager()
    }

    private val iAuthRetrofit: IAuthRetrofit? = RetrofitClient.getClient(BASE_URL)?.create(IAuthRetrofit::class.java)

    suspend fun checkConnection(): Boolean{
        val call = iAuthRetrofit?.checkConnection()
        val response = call?.awaitResponse()!!
        val statusCode = response.code()

        return statusCode == 200
    }

    suspend fun login(email: String, password: String): SuspendedLoginResponse{
        val call = iAuthRetrofit?.login(email, password)
        val response = call?.awaitResponse()!!

        val statusCode = response.code()
        val body = response.body() as JsonObject
        val success = body.get("success").asBoolean
        val msg = body.get("msg").asString
        val token = body.get("token").asString

        if(statusCode == 200){
            SharedPreferenceManager.setToken(token)
            return SuspendedLoginResponse(msg = msg, success = success)
        }else{
            return SuspendedLoginResponse(msg = msg, success = success)
        }
    }

    suspend fun signUp(email: String, username: String, password: String, passwordConfirm: String, phone: String): BaseResponse{
        val call = iAuthRetrofit?.signUp(email, username, password, passwordConfirm, phone)
        val response = call?.awaitResponse()!!

        val statusCode = response.code()
        val body = response.body() as JsonObject
        val msg = body.get("msg").asString
        val success = body.get("success").asBoolean

        if(statusCode == 200){
            return BaseResponse(msg = msg, success=success)
        }else{
            return BaseResponse(msg = msg, success=success)
        }
    }

    suspend fun me(): MeResponse{
        val call = iAuthRetrofit?.me()
        val response = call?.awaitResponse()!!
        val body = response.body() as JsonObject
        val userId = body.get("userId").asString
        val username = body.get("username").asString
        val email = body.get("email").asString
        val success = body.get("success").asBoolean
        val msg = body.get("msg").asString
        val statusCode = response.code()

        if(statusCode == 200){
            return MeResponse(userId, username, email, success, msg)
        }else{
            return MeResponse(userId, username, email, success, msg)
        }
    }
}