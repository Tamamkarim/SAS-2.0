import { Menu, Flex } from 'antd';
import { Link, Outlet } from 'react-router-dom';

function Dashboard() {
    return (
        <Flex vertical gap={16}>
            <Menu mode="horizontal" items={[
                { key: "1", label: <Link to="/dashboard/edit-hotels">Edit Hotels</Link> },
            ]}>
            </Menu>
            <Flex vertical>
                <Outlet />
            </Flex>
        </Flex>
    );
}

export default Dashboard;