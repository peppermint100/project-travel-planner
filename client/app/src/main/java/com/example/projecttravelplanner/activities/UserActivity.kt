package com.example.projecttravelplanner.activities

import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import com.example.projecttravelplanner.R
import com.example.projecttravelplanner.databinding.ActivityUserBinding
import com.example.projecttravelplanner.fragments.ForgotPasswordFragment
import com.example.projecttravelplanner.fragments.LoginFragment
import com.example.projecttravelplanner.fragments.SignUpFragment
import kotlin.math.sign

class UserActivity: AppCompatActivity() {
    private val TAG: String = "로그"
    private lateinit var loginFragment: LoginFragment
    private lateinit var signupFragment: SignUpFragment
    private lateinit var forgotPasswordFragment: ForgotPasswordFragment

    private lateinit var binding: ActivityUserBinding
    override fun onCreate(savedInstanceState: Bundle?){
        super.onCreate(savedInstanceState)
        Log.d(TAG, "MainActivity - onCreate: ");
        binding = DataBindingUtil.setContentView(this, R.layout.activity_user)

        loginFragment = LoginFragment()
        signupFragment = SignUpFragment()
        forgotPasswordFragment = ForgotPasswordFragment()

        toSignUpFragment()
        applyFragmentNavigation()

    }

    private fun applyFragmentNavigation(){
        binding.toLoginButton.setOnClickListener {
            toLoginFragment()
        }
        binding.toSignupButton.setOnClickListener {
            toSignUpFragment()
        }
        binding.toForgotPasswordButton.setOnClickListener {
            toForgotPasswordFragment()
        }
    }

    private fun toLoginFragment(){
        supportFragmentManager.beginTransaction().apply {
            replace(R.id.user_fragment_frame, loginFragment)
            commit()
        }
    }
    private fun toSignUpFragment(){
        supportFragmentManager.beginTransaction().apply {
            replace(R.id.user_fragment_frame, signupFragment)
            commit()
        }
    }
    private fun toForgotPasswordFragment(){
        supportFragmentManager.beginTransaction().apply {
            replace(R.id.user_fragment_frame, forgotPasswordFragment)
            commit()
        }
    }
}