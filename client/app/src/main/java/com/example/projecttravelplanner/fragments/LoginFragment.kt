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
import com.example.projecttravelplanner.databinding.FragmentLoginBinding
import com.example.projecttravelplanner.retrofit.auth.AuthRetrofitManager
import com.example.projecttravelplanner.utils.SharedPreferenceManager
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext


class LoginFragment: Fragment(R.layout.fragment_login) {
    private val TAG: String = "로그"
    private lateinit var binding: FragmentLoginBinding

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        Log.d(TAG, "SignUpFragment - onCreateView: ");
        binding = DataBindingUtil.inflate(inflater, R.layout.fragment_login, container, false)

        binding.loginButton.setOnClickListener {
            Log.d(TAG, "LoginFragment - onCreateView: Login button clicked");

            val email = binding.etEmail.text.toString()
            val password = binding.etPassword.text.toString()
            CoroutineScope(Dispatchers.IO).launch {
                val loginResult = AuthRetrofitManager.instance.login(email=email, password=password)

                withContext(Dispatchers.Main){
                    if(loginResult.success){
                        // set input to ""
                        Log.d(TAG, "LoginFragment - onCreateView: login succeed ");
                        binding.etEmail.text?.clear()
                        binding.etPassword.text?.clear()
                        Toast.makeText(activity, loginResult.msg, Toast.LENGTH_SHORT).show()
                    }else{
                        Toast.makeText(activity, loginResult.msg, Toast.LENGTH_SHORT).show()
                    }
                }
                Log.d(TAG, "SignUpFragment - signInRequest: $email,  $password");

                val token = SharedPreferenceManager.getToken()
                Log.d(TAG, "LoginFragment - onCreateView: token saved : $token");
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