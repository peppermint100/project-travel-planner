package com.example.projecttravelplanner.fragments

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import com.example.projecttravelplanner.App
import com.example.projecttravelplanner.R
import com.example.projecttravelplanner.databinding.FragmentSignupBinding
import com.example.projecttravelplanner.retrofit.auth.AuthRetrofitManager
import com.example.projecttravelplanner.utils.EmailValidator
import kotlinx.coroutines.*

class SignUpFragment: Fragment() {
    private val TAG: String = "로그"
    private lateinit var binding: FragmentSignupBinding

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        Log.d(TAG, "SignUpFragment - onCreateView: ");
        binding = DataBindingUtil.inflate(inflater, R.layout.fragment_signup, container, false)

        binding.signInButton.setOnClickListener {
            val email = binding.etEmail.text.toString()
            val username = binding.etUsername.text.toString()
            val password = binding.etPassword.text.toString()
            val passwordConfirm = binding.etPasswordConfirm.text.toString()
            val phone = binding.etPhone.text.toString()

            CoroutineScope(Dispatchers.IO).launch {
                val signUpResult = AuthRetrofitManager.instance.signUp(email=email, username=username, password=password, passwordConfirm = passwordConfirm, phone = phone)

                withContext(Dispatchers.Main){
                    if(signUpResult.success){
                        // set input to ""
                        binding.etEmail.text?.clear()
                        binding.etUsername.text?.clear()
                        binding.etPassword.text?.clear()
                        binding.etPasswordConfirm.text?.clear()
                        binding.etPhone.text?.clear()
                        Toast.makeText(activity, signUpResult.msg, Toast.LENGTH_SHORT).show()
                    }else{
                        Toast.makeText(activity, signUpResult.msg, Toast.LENGTH_SHORT).show()
                    }
                }
                }
                Log.d(TAG, "SignUpFragment - signInRequest: $email, $username, $password, $passwordConfirm ");
            }
        val view = binding.root
        return view
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d(TAG, "LoginFragment - onCreate: ");
    }
}