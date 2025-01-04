# Setup WiFI on ElkOS Device

## SSH into Device

```shell
ssh mind@<RPI-IP-ADDRESS>
```

**Username:** `mind`  
**Password:** `elk`

Print out SSID of all available networks:

```shell
sudo iw dev wlan0 scan | grep SSID
```

## Setup Wifi

Setup Wifi File using nano:

```shell
sudo mkdir -p /var/run/wpa_supplicant
sudo chmod 755 /var/run/wpa_supplicant

sudo mkdir /etc/wpa_supplicant
sudo nano /etc/wpa_supplicant/wpa_supplicant.conf
```

Replace country, ssid and psk:

```shell
country=SE
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
    ssid="YourNetworkSSID"
    psk="YourNetworkPassword"
}
```

Make the file executable:

```shell
sudo chmod 600 /etc/wpa_supplicant/wpa_supplicant.conf
sudo systemctl restart wpa_supplicant
sudo wpa_cli
sudo iw wlan0 link
```

## Make Network Persistant

```shell
sudo nano /etc/network/interfaces
sudo nano /etc/systemd/network/10-wlan0.network
```

Add:

```shell
[Match]
Name=wlan0

[Network]
DHCP=yes

[Wireless]
WPAConf=/etc/wpa_supplicant/wpa_supplicant.conf
```

Restart WLan:

```shell
sudo systemctl restart systemd-networkd
sudo systemctl enable systemd-networkd

sudo systemctl restart wpa_supplicant
sudo systemctl enable wpa_supplicant

iw wlan0 link
```
