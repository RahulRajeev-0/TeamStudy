import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useRef, useEffect } from 'react'; // Import useRef and useEffect
import { toast } from 'react-toastify';

const GroupVideoCall = () => {
    let { roomId } = useParams();
    const containerRef = useRef(null);
    const userData = useSelector((state) => state.authenticationUser)
    const workspaceProfile = useSelector((state)=> state.workspaceUserProfile)
    const userID = workspaceProfile.id;
    const userName = userData.username;
    const navigate = useNavigate();
    

   
    const handleLeaveRoom = () => {
        navigate(`/workspace-channel/${roomId}/`);
    }

    useEffect(() => {
        const MyVideoCallMeet = async () => { 
            try {
                const appID = 1921400802;
                const serverSecret = "cc93b5ec5438b90b2390c44f469d08b6";
                const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest( 
                    appID,
                    serverSecret,
                    roomId,
                    Date.now().toString(),
                    userName
                );
                console.log(kitToken,'THIS IS KIT TOKEN');
                
                const zp = ZegoUIKitPrebuilt.create(kitToken);
                
                
                zp.joinRoom({
                    container: containerRef.current,
                    scenario: {
                        mode: ZegoUIKitPrebuilt.GroupCall
                    },
                    turnOnCameraWhenJoining: true,
                    turnOnMicrophoneWhenJoining: true,
                    showPreJoinView: false,
                    onLeaveRoom: handleLeaveRoom
                });
            } catch (error) {
                console.error('Error generating kit token:', error);
            }
        }
        MyVideoCallMeet(); // Call MyVideoCallMeet with the ref element
    }, [roomId, userID, userName, navigate]);

    return (
        <>
            <div className="w-full h-full" ref={containerRef} />
        </>
    );
}

export default GroupVideoCall;