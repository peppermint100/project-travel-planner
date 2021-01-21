package com.example.projecttravelplanner.utils

import android.content.Context
import com.example.projecttravelplanner.App

object SharedPreferenceManager {
    private const val SHARED_SECRET = "SHARED_SECRET"
    private const val KEY_TOKEN = "KEY_TOKEN"

    fun getToken(): String {
        val shared = App.instance.getSharedPreferences(SHARED_SECRET, Context.MODE_PRIVATE)

        return shared.getString(KEY_TOKEN, "")!!
    }

    fun setToken(token: String){
        val shared = App.instance.getSharedPreferences(SHARED_SECRET, Context.MODE_PRIVATE)
        val editor = shared.edit()

        editor.putString(KEY_TOKEN, token)
        editor.apply()
    }

    fun clearToken(){
        val shared = App.instance.getSharedPreferences(SHARED_SECRET, Context.MODE_PRIVATE)
        val editor = shared.edit()

        editor.clear()
        editor.apply()
    }
}


