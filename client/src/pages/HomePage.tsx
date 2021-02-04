import React, { useState, useEffect } from 'react'
import { Layout } from 'antd';
import { Drawer, Button, Divider } from 'antd';
import { MenuOutlined, HomeFilled, UserOutlined, LogoutOutlined, LinkOutlined, HomeOutlined, SmileFilled, ApiFilled, TagFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import MyPlanView from "../components/View/HomePageView/MyPlanView"
import MyPageView from "../components/View/HomePageView/MyPageView"
import { RootReducerType } from '../redux/reducers/rootReducer';
import UserProfileImage from '../components/Image/UserProfileImage';
import Cookies from "universal-cookie"
import { useHistory, withRouter } from 'react-router-dom';
import { _requestMe } from '../redux/actions/MeAction';
import SharedPlanView from '../components/View/HomePageView/SharedPlanView';
import { _requestGetAllPlans } from '../redux/actions/GetAllPlansAction';

const HomePage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const cookies = new Cookies()
  const [isVisible, setIsVisible] = useState(false);
  const [currentContent, setCurrentContent] = useState({
      tabNumber: 0
  })
  const meResponse = useSelector((state: RootReducerType) => state.MeReducer)

  useEffect(() => {
    dispatch(_requestGetAllPlans(meResponse.userId))
  }, [meResponse])

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
    cookies.set("X-AUTH-TOKEN", "")
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
        </nav>
        <Drawer
            visible={isVisible}
            onClose={closeDrawer}
            placement="left"
            width="300"
        >
          <ul>
            <li className="flex flex-col items-start">
              <div className="w-20 h-20 mb-2">
                  <UserProfileImage src={meResponse.userImage} width="70px" height="70px" />
              </div>
              <div>
                <span className="text-2xl font-bold">
                      { meResponse.name }
                </span>
              </div>
              <div className="mb-4">
                <span className="text-lg text-gray-500">
                  { meResponse.email }
                </span>
              </div>
            </li>
            <Divider />
              <li className="flex h-16 items-center" onClick={() => { onTabClicked(0)}}>
                <div style={drawerMenuStyle}>
                  <HomeFilled className="text-2xl text-gray-500"/> 
                </div>
                <div style={drawerMenuStyle} className="text-black font-semibold text-lg ml-4">
                  홈
                </div>
              </li>
              <li className="flex h-16 items-center" onClick={() => { onTabClicked(1)}}>
                <div style={drawerMenuStyle}>
                  <SmileFilled className="text-2xl text-gray-500" />
                </div>
                <div style={drawerMenuStyle} className="text-lg font-semibold text-black ml-4">
                  마이페이지
                </div>
              </li>
               <li className="flex h-16 items-center" onClick={() => { onTabClicked(2)}}>
                <div style={drawerMenuStyle}>
                  <TagFilled className="text-2xl text-gray-500" />
                </div>
                <div style={drawerMenuStyle} className="text-lg font-semibold text-black ml-4">
                  공유받은 플랜
                </div>
              </li>
              <li className="flex h-16 items-center" onClick={logout}>
                <div style={drawerMenuStyle}>
                  <ApiFilled className="text-2xl text-gray-500" />
                </div>
                <div style={drawerMenuStyle} className="text-lg font-semibold text-black ml-4">
                  로그아웃
                </div>
              </li>
              <Divider />
            </ul>
        </Drawer>
      <Layout className="min-h-screen">
          { currentContent.tabNumber === 0 ? 
            <MyPlanView userId={meResponse.userId} /> : 
            currentContent.tabNumber === 1 ?
            <MyPageView meResponse={meResponse} /> : 
            <SharedPlanView userId={meResponse.userId} />
          } 
      </Layout>
    </Layout>
  );
}

const drawerMenuStyle: React.CSSProperties = {
  lineHeight: "2.5rem",
  marginRight: ".5rem"
}


export default withRouter(HomePage)
