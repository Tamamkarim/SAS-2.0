import { Dropdown, Avatar, Flex, Typography, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';


const AuthNavbar = ({ user }) => {
    const { dispatch } = useContext(AuthContext);
    let items = [
        {
            key: '1',
            label:
                <Flex vertical justify='center' align='center'>
                    <Avatar size={150} icon={<Image style={{ objectFit: "cover" }} src={user.img} />} fallback="" />
                    <Typography.Text style={{ fontSize: "1.5em" }}>Hi, {user.username}!</Typography.Text>
                </Flex>
        },
        {
            key: '2',
            label: (
                <Link to="/profile">Profile</Link>
            ),
        },
        ...(user.isAdmin ? [{
            key: '3',
            label: (
                <Link to="/dashboard">Dashboard</Link>
            ),
        }] : []),
        {
            key: '4',
            danger: true,
            label: 'Logout',
            onClick: () => {
                dispatch({ type: 'LOGOUT' });
            },
        },
    ];

    return (
        <Dropdown
            overlayStyle={{ minWidth: '200px', textAlign: 'center' }}
            menu={{ items }}
            placement='bottom' arrow={{ pointAtCenter: true }}
        >
            <a onClick={(e) => e.preventDefault()}>
                <Avatar icon={<UserOutlined />} />
            </a>
        </Dropdown>
    )
}

export default AuthNavbar;