package com.example.projecttravelplanner.retrofit.auth
import android.util.Log
import android.widget.Toast
import com.example.projecttravelplanner.retrofit.RetrofitClient
import com.example.projecttravelplanner.type.BaseResponse
import com.example.projecttravelplanner.type.auth.MeResponse
import com.example.projecttravelplanner.type.auth.SuspendedLoginResponse
import com.example.projecttravelplanner.utils.API.BASE_URL
import com.example.projecttravelplanner.utils.EmailValidator
import com.example.projecttravelplanner.utils.SharedPreferenceManager
import com.google.gson.JsonObject
import retrofit2.awaitResponse

class AuthRetrofitManager {

    private val TAG: String = "로그"

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

    suspend fun login(email: String, password: String): BaseResponse{
        if(email.isEmpty() || password.isEmpty()){
            Log.d(TAG, "AuthRetrofitManager - signUp: 빈 칸이 존재합니다. ");
            val msg="빈 칸을 전부 채워주세요."
            val success=false
            return BaseResponse(msg = msg, success=success)
        }

        if(!EmailValidator.isEmailValid(email)){
            Log.d(TAG, "AuthRetrofitManager - signUp: 이메일의 형식이 올바르지 않습니다 ");
            val msg="이메일의 형식이 올바르지 않습니다."
            val success=false
            return BaseResponse(msg = msg, success=success)
        }
        val call = iAuthRetrofit?.login(email=email, password=password)
        val response = call?.awaitResponse()!!

        val statusCode = response.code()
        val body = response.body() as JsonObject
        val success = body.get("success").asBoolean
        val msg = body.get("msg").asString
        val token = body.get("token").asString

        Log.d(TAG, "AuthRetrofitManager - login: login result: $success, $msg, $token ");

        if(statusCode == 200){
            SharedPreferenceManager.setToken(token)
            return BaseResponse(msg = msg, success = success)
        }else{
            return BaseResponse(msg = msg, success = success)
        }
    }

    suspend fun signUp(email: String, username: String, password: String, passwordConfirm: String, phone: String): BaseResponse{
        if(email.isEmpty() || username.isEmpty() || password.isEmpty() || passwordConfirm.isEmpty() || phone.isEmpty()){
            Log.d(TAG, "AuthRetrofitManager - signUp: 빈 칸이 존재합니다. ");
            val msg="빈 칸을 전부 채워주세요."
            val success=false
            return BaseResponse(msg = msg, success=success)
        }

        if(password != passwordConfirm){
            Log.d(TAG, "AuthRetrofitManager - signUp: 비밀번호가 서로 일치하지 않습니다. ");
            val msg="비밀번호가 서로 일치하지 않습니다."
            val success=false
            return BaseResponse(msg = msg, success=success)
        }

        if(!EmailValidator.isEmailValid(email)){
            Log.d(TAG, "AuthRetrofitManager - signUp: 이메일의 형식이 올바르지 않습니다 ");
            val msg="이메일의 형식이 올바르지 않습니다."
            val success=false
            return BaseResponse(msg = msg, success=success)
        }

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