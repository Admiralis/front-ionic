import React from 'react';

interface AlertIconProps {
    size?: number;
}
const AlertIconComponent = (props: AlertIconProps) => {
    const {size} = props;
    return (
        <span>
            <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M10 18C11.0506 18 12.0909 17.7931 13.0615 17.391C14.0321 16.989 14.914 16.3997 15.6569 15.6569C16.3997 14.914 16.989 14.0321 17.391 13.0615C17.7931 12.0909 18 11.0506 18 10C18 8.94942 17.7931 7.90914 17.391 6.93853C16.989 5.96793 16.3997 5.08601 15.6569 4.34314C14.914 3.60028 14.0321 3.011 13.0615 2.60896C12.0909 2.20693 11.0506 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM9 14H11V16H9V14ZM9 4H11V12H9V4Z"
                    fill="#CCCCCC"/>
            </svg>
        </span>
    );
};

export default AlertIconComponent;