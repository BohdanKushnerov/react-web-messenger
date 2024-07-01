const checkMicrophonePermission = async () => {
  try {
    const permissionStatus = await navigator.permissions.query({
      name: 'microphone' as PermissionName,
    });
    if (permissionStatus.state === 'granted') {
      return true;
    } else if (permissionStatus.state === 'prompt') {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      return true;
    }
    return false;
  } catch (error) {
    console.error('checkMicrophonePermission', error);
    return false;
  }
};

export default checkMicrophonePermission;
