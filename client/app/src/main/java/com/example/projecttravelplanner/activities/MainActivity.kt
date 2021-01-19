package com.example.projecttravelplanner.activities

import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import com.example.projecttravelplanner.R
import com.example.projecttravelplanner.databinding.ActivityMainBinding
import com.example.projecttravelplanner.retrofit.auth.AuthRetrofitManager
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class MainActivity: AppCompatActivity() {
    private val TAG: String = "로그"
    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d(TAG, "MainActivity - onCreate: ");
        binding = DataBindingUtil.setContentView(this, R.layout.activity_main)

        CoroutineScope(Dispatchers.IO).launch {
            val meResult = AuthRetrofitManager.instance.me()
        }
    }
}