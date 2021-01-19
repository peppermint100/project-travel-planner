package com.example.projecttravelplanner.fragments

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import com.example.projecttravelplanner.R
import com.example.projecttravelplanner.databinding.FragmentForgotpasswordBinding
import com.example.projecttravelplanner.databinding.FragmentLoginBinding
import com.example.projecttravelplanner.retrofit.auth.AuthRetrofitManager
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class ForgotPasswordFragment: Fragment() {
    private val TAG: String = "로그"
    private lateinit var binding: FragmentForgotpasswordBinding

    override fun onCreateView(
            inflater: LayoutInflater,
            container: ViewGroup?,
            savedInstanceState: Bundle?
    ): View? {
        binding = DataBindingUtil.inflate(inflater, R.layout.fragment_forgotpassword, container, false)
        binding.forgotPasswordSubmitButton.setOnClickListener {
            Log.d(TAG, "ForgotPasswordFragment - onCreate: sending request ");
            val email = binding.etEmail.text.toString()
            val username = binding.etUsername.text.toString()

            CoroutineScope(Dispatchers.IO).launch {
                val response = AuthRetrofitManager.instance.sendResetPasswordRequest(email, username)

                Log.d(TAG, "ForgotPasswordFragment - onCreateView: msg: ${response.msg} ");
                withContext(Dispatchers.Main){
                    if(response.success){
                        Toast.makeText(activity, response.msg, Toast.LENGTH_SHORT).show()
                    }else{
                        Toast.makeText(activity, response.msg, Toast.LENGTH_SHORT).show()
                    }
                }
            }
        }
        val view = binding.root
        return view

    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d(TAG, "LoginFragment - onCreate: ");

    }

}
