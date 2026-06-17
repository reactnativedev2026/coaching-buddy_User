import CustomHeader from "@/components/common/CustomHeader";
import NotFound from "@/components/common/NotFound";
import React from 'react';
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  image?: string;
  link?: string;
  timestamp: string;
  read: boolean;
}

// Static notification data
const staticNotifications: NotificationItem[] = [
  {
    id: '1',
    title: 'Welcome to the App!',
    message: 'Thank you for joining us. Explore all the amazing features we have to offer.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=200&fit=crop',
    link: 'https://google.com',
    timestamp: '2 min ago',
    read: false
  },
  {
    id: '2',
    title: 'System Update Available',
    message: 'A new version is available with bug fixes and performance improvements.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop',
    timestamp: '1 hour ago',
    read: false
  },
  {
    id: '3',
    title: 'Special Offer!',
    message: 'Get 50% off on premium features. Limited time offer ending soon.',
    image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=300&h=200&fit=crop',
    link: 'https://google.com',
    timestamp: '3 hours ago',
    read: true
  },
//   {
//     id: '4',
//     title: 'Profile Updated Successfully',
//     message: 'Your profile information has been updated and saved successfully.',
//     timestamp: '1 day ago',
//     read: true
//   },
  {
    id: '5',
    title: 'Security Alert',
    message: 'We detected a login from a new device. If this wasn\'t you, please secure your account.',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300&h=200&fit=crop',
    link: 'https://google.com',
    timestamp: '2 days ago',
    read: true
  },
  {
    id: '6',
    title: 'New Feature Released',
    message: 'Check out our latest feature that will help you be more productive.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop',
    timestamp: '3 days ago',
    read: true
  },
//   {
//     id: '7',
//     title: 'Weekly Summary',
//     message: 'Here\'s your activity summary for this week.',
//     timestamp: '4 days ago',
//     read: true
//   },
//   {
//     id: '8',
//     title: 'Maintenance Notice',
//     message: 'Scheduled maintenance will occur tonight from 2AM-4AM.',
//     timestamp: '5 days ago',
//     read: true
//   }
];

const NotificationCard: React.FC<{ item: NotificationItem }> = ({ item }) => {
  const handleNotificationPress = () => {
    if (item.link) {
      Linking.openURL(item.link);
    }
    // You can add other actions here like marking as read, navigation, etc.
    console.log('Notification pressed:', item.id);
  };

  return (
    <TouchableOpacity
      onPress={handleNotificationPress}
      className={`mx-3 mb-2 rounded-xl border bg-white border-gray-200 ${
        !item.read ? 'shadow-md' : 'shadow-sm'
      }`}
      style={{ elevation: !item.read ? 4 : 1 }}
      activeOpacity={0.8}
    >
      <View className="p-3">
        {/* Compact Header */}
        <View className="flex-row justify-between items-start mb-2">
          <View className="flex-1 flex-row items-center mr-2">
            <View className={`w-2 h-2 rounded-full ${!item.read ? 'bg-accent1' : 'bg-gray-400'} mr-2 mt-1 flex-shrink-0`} />
            <Text className={`font-semibold text-base flex-1 ${!item.read ? 'text-gray-900' : 'text-gray-700'}`} numberOfLines={1}>
              {item.title}
            </Text>
          </View>
          <Text className="text-xs text-gray-500 ml-1">{item.timestamp}</Text>
        </View>

        {/* Compact layout: Image and content side by side if image exists */}
        <View className={`${item.image ? 'flex-row' : ''}`}>
          {/* Small thumbnail image */}
          {item.image && (
            <View className="w-16 h-12 rounded-lg overflow-hidden mr-3 flex-shrink-0">
              <Image
                source={{ uri: item.image }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
          )}

          {/* Content area */}
          <View className="flex-1">
            {/* Compact Message */}
            <Text 
              className={`text-sm leading-4 ${!item.read ? 'text-gray-800' : 'text-gray-600'}`}
              numberOfLines={item.image ? 2 : 3}
            >
              {item.message}
            </Text>

            {/* Show clickable indicator for notifications with links */}
            {item.link && (
              <Text className="text-xs text-blue-500 mt-1 font-medium">
                Tap to view details →
              </Text>
            )}
          </View>
        </View>

        {/* Unread indicator */}
        {!item.read && (
          <View className="absolute top-2 right-2 w-1.5 h-1.5 bg-blue-500 rounded-full" />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default function Notifications() {
  const unreadCount = staticNotifications.filter(notification => !notification.read).length;

  const renderHeader = () => (
    <View className="px-3 py-2 mb-1">
      <View className="flex-row justify-between items-center">
        <Text className="text-base font-semibold text-gray-800">
          Recent Notifications
        </Text>
        {unreadCount > 0 && (
          <View className="bg-red-500 rounded-full px-2 py-0.5">
            <Text className="text-white text-xs font-bold">
              {unreadCount} new
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <CustomHeader title="Notifications" />
      
      {staticNotifications.length === 0 ? (
        <NotFound
          heading="No notifications found!"
          body="You don't have any notifications yet!"
        />
      ) : (
        <FlatList
          data={staticNotifications}
          renderItem={({ item }) => <NotificationCard item={item} />}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 15, paddingTop: 5 }}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={10}
        />
      )}
    </View>
  );
}