package com.hannib;

import android.os.Bundle;
import android.util.Base64;
import android.util.Log;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
//import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {


  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "hannib";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. There the RootView is created and
   * you can specify the rendered you wish to use (Fabric or the older renderer).
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new MainActivityDelegate(this, getMainComponentName());
  }

  public static class MainActivityDelegate extends ReactActivityDelegate {
    public MainActivityDelegate(ReactActivity activity, String mainComponentName) {
      super(activity, mainComponentName);
    }

    @Override
    protected ReactRootView createRootView() {
      ReactRootView reactRootView = new ReactRootView(getContext());
      // If you opted-in for the New Architecture, we enable the Fabric Renderer.
      reactRootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
      temp();
      return reactRootView;
    }

    public void temp() {
      C5:AD:B3:13:05:CB:BA:31:93:0A:81:2C:36:F1:A5:6A:7C:BA:34:84
      byte[] sha1 = {
              (byte)0xC5, (byte)0xAD, (byte)0xB3,  (byte)0x13, (byte)0x05, (byte)0xCB,
              (byte)0xBA, (byte)0x31, (byte)0x93, (byte)0x0A, (byte)0x81, (byte)0x2C,
              (byte)0x36, (byte)0xF1, (byte)0xA5, (byte)0x6A, (byte)0x7C, (byte)0xBA,
              (byte)0x34, (byte)0x84};
      Log.e("keyhash new!!!! : ", Base64.encodeToString(sha1, Base64.NO_WRAP));
    }
  }
}
