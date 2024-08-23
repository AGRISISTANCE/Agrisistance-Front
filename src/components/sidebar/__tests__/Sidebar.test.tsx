import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from '../Sidebar';
import { Icon } from '@chakra-ui/react';
import { MdHome } from 'react-icons/md';

// Mock the Content component
jest.mock('../components/Content', () => () => <div>Content</div>);

describe('Sidebar Component', () => {
  test('renders Sidebar component', () => {
    const routes = [
      {
        path: '/',
        name: 'Landing Page',
        layout: '/',
        icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
        component: <div>Landing Page Component</div>,
      },
    ];

    render(<Sidebar routes={routes} />);
    
    // Assertions
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
