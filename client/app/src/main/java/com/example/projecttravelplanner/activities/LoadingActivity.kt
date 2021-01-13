package com.example.projecttravelplanner.activities

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import com.example.projecttravelplanner.R
import com.example.projecttravelplanner.databinding.ActivityLoadingBinding
import com.example.projecttravelplanner.retrofit.auth.AuthRetrofitManager
import kotlinx.coroutines.*

class LoadingActivity: AppCompatActivity() {
    private val TAG: String = "로그"

    private lateinit var binding: ActivityLoadingBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d(TAG, "LoadingActivity - onCreate: ");

        binding = DataBindingUtil.setContentView(this, R.layout.activity_loading)

        CoroutineScope(Dispatchers.IO).launch{
            delay(1000)
//            val isLoading = AuthRetrofitManager.instance.checkConnection()
            val isLoading = true
            Log.d(TAG, "LoadingActivity - onCreate: checking server connection...$isLoading ");
            withContext(Dispatchers.Main){
                if(isLoading){
                    Toast.makeText(this@LoadingActivity, "OK.", Toast.LENGTH_SHORT)
                    val intent = Intent(this@LoadingActivity, UserActivity::class.java)
                    startActivity(intent)
                }else{
                    Toast.makeText(this@LoadingActivity, "어플리케이션 서버에 문제가 있습니다.", Toast.LENGTH_SHORT)
                }
            }
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        finish()
    }
}