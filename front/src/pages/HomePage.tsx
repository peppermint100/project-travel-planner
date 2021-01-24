import React, { useState } from 'react'
import { Layout, message } from 'antd';
import { Drawer, Button, Divider } from 'antd';
import { MenuOutlined, HomeFilled, UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import MyPlanContent from "./../components/Content/HomePageContent/MyPlanContent"
import MyPageContent from "./../components/Content/HomePageContent/MyPageContent"
import { RootReducerType } from '../redux/reducers/rootReducer';
import UserProfileImage from '../components/Image/UserProfileImage';
import Cookies from "universal-cookie"
import { useHistory, withRouter, useLocation } from 'react-router-dom';
import { _requestMe } from '../redux/actions/MeAction';
import SharedPlanContent from '../components/Content/HomePageContent/SharedPlanContent';
import { MeResponse } from '../types/api/UserType';

const HomePage = () => {
  const defaultUserImage = "https://upload.wikimedia.org/wikipedia/commons/3/39/Kaya_Scodelario_%2814781570315%29_%28cropped%29.jpg"
  const history = useHistory()
  const [isVisible, setIsVisible] = useState(false);
  const [currentContent, setCurrentContent] = useState({
      tabNumber: 0
  })

  const location = useLocation<Partial<MeResponse>>()

  const meResponse = useSelector((state: RootReducerType) => state.MeReducer)

  // trigger this function to open the drawer
  const showDrawer = () => {
    setIsVisible(true);
  };
  // close the drawer
  const closeDrawer = () =>{
    setIsVisible(false);
  };

  const logout = () => {
    console.log('clicking logout button')
    const cookies = new Cookies()
    cookies.remove("X-AUTH-TOKEN")
    history.push("/login")
  }

  const onTabClicked = (tabNumber: number) => {
        setCurrentContent( content => {
            return {
                ...content,
                tabNumber 
            }
        })
        closeDrawer()
    }  

// Styling
const styles = {
  nav: {
    height: 50,
    background: '#096dd9',
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: 'white',
    fontSize: 16,
  },
};

  return (
    <Layout>
        <nav 
            className="relative h-20 flex">
                <div className="ml-8 mt-4">
                    <Button shape="circle" style={styles.button} onClick={showDrawer}>
                        <MenuOutlined className="text-primary text-3xl"/>
                    </Button>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <p className="text-xl font-semibold text-primary">  
                        { 
                            currentContent.tabNumber === 0 ? 
                            "나의 계획" : 
                            currentContent.tabNumber === 1 ?
                            "마이 페이지" :
                            "공유 받은 계획"
                        } 
                    </p>
                </div>
                <div></div>
        </nav>
        <Drawer
            visible={isVisible}
            onClose={closeDrawer}
            placement="left"
        >
          <ul>
            <li className="flex flex-col items-center">
              <div className="w-28 h-28 mb-2">
                  <UserProfileImage src={defaultUserImage} />
              </div>
              <div className="mb-2">
                <span className="text-lg text-primary">
                  <span className="text-xl font-bold mr-2">
                    {
                      !meResponse.success && !!location.state
                      ? location.state.name 
                      : meResponse.name
                    }</span>회원님</span>
              </div>
              <div>
                <span className="font-semibold text-primary">{ 
                    !meResponse.success && !!location.state
                    ? location.state.email
                    : meResponse.email
                  }</span>
              </div>
            </li>
            <Divider />
              <li className="flex h-10" onClick={() => { onTabClicked(0)}}>
                <div style={drawerMenuStyle}>
                  <HomeFilled className="text-3xl text-primary"/> 
                </div>
                <div style={drawerMenuStyle} className="text-primary text-xl font-semibold ml-4">
                  홈
                </div>
              </li>
              <Divider />
              <li className="flex h-10" onClick={() => { onTabClicked(1)}}>
                <div style={drawerMenuStyle}>
                  <UserOutlined className="text-3xl text-primary" />
                </div>
                <div style={drawerMenuStyle} className="text-xl text-primary font-semibold ml-4">
                  마이페이지
                </div>
              </li>
              <Divider />
               <li className="flex h-10" onClick={() => { onTabClicked(2)}}>
                <div style={drawerMenuStyle}>
                  <UserOutlined className="text-3xl text-primary" />
                </div>
                <div style={drawerMenuStyle} className="text-xl text-primary font-semibold ml-4">
                  공유받은 플랜
                </div>
              </li>
              <Divider />
              <li className="flex h-10" onClick={() => { logout()}}>
                <div style={drawerMenuStyle}>
                  <LogoutOutlined className="text-3xl text-primary" />
                </div>
                <div style={drawerMenuStyle} className="text-xl text-primary font-semibold ml-4">
                  로그아웃
                </div>
              </li>
              <Divider />
            </ul>
        </Drawer>
      <Layout className="min-h-screen">
          { currentContent.tabNumber === 0 ? 
            <MyPlanContent userId={meResponse.userId} /> : 
            currentContent.tabNumber === 1 ?
            <MyPageContent /> : 
            <SharedPlanContent />
          } 
      </Layout>
    </Layout>
  );
}

const drawerMenuStyle: React.CSSProperties = {
  lineHeight: "2.5rem"
}


export default withRouter(HomePage)
