package com.example.projecttravelplanner.activities

import android.media.Image
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.ImageView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.GravityCompat
import androidx.databinding.DataBindingUtil
import com.example.projecttravelplanner.R
import com.example.projecttravelplanner.databinding.ActivityMainBinding
import com.example.projecttravelplanner.fragments.HomeFragment
import com.example.projecttravelplanner.fragments.MyPageFragment
import com.example.projecttravelplanner.fragments.SettingsFragment
import com.example.projecttravelplanner.retrofit.auth.AuthRetrofitManager
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class MainActivity: AppCompatActivity() {
    private val TAG: String = "로그"

    private lateinit var homeFragment: HomeFragment
    private lateinit var myPageFragment: MyPageFragment
    private lateinit var settingsFragment: SettingsFragment

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d(TAG, "MainActivity - onCreate: ");

        binding = DataBindingUtil.setContentView(this, R.layout.activity_main)
        val navCloseButton = binding.navView.getHeaderView(0).findViewById<ImageView>(R.id.nav_close_button)
        homeFragment = HomeFragment()
        myPageFragment = MyPageFragment()
        settingsFragment = SettingsFragment()

        toHomeFragment()

        binding.menuDrawerButton.setOnClickListener {
            Log.d(TAG, "MainActivity - onCreate: menu icon clicked ");
            binding.drawerLayout.openDrawer(GravityCompat.START)
        }

        navCloseButton.setOnClickListener {
            Log.d(TAG, "MainActivity - onCreate: menu close button clicked ");
            binding.drawerLayout.closeDrawer(GravityCompat.START)
        }

        binding.navView.setNavigationItemSelectedListener {
            when(it.itemId){
                R.id.my_plan ->{
                    toHomeFragment()
                }
                R.id.my_page ->{
                    toMyPageFragment()
                }
                R.id.my_settings ->{
                    toSettingsFragment()
                }
            }
            true
        }

        CoroutineScope(Dispatchers.IO).launch {
            val meResult = AuthRetrofitManager.instance.me()
        }
    }

    private fun toHomeFragment(){
        supportFragmentManager.beginTransaction().apply {
            replace(R.id.user_fragment_frame, homeFragment)
            commit()
        }
    }

    private fun toMyPageFragment(){
        supportFragmentManager.beginTransaction().apply {
            replace(R.id.user_fragment_frame, myPageFragment)
            commit()
        }
    }

    private fun toSettingsFragment(){
        supportFragmentManager.beginTransaction().apply {
            replace(R.id.user_fragment_frame, settingsFragment)
            commit()
        }
    }
}