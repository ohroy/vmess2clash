interface CommonConfig {
    Name: string,
    Type: string,
}

export interface VmessProxyServer extends CommonConfig {
    Type: 'vmess',
    ClientID: string,
    ClientAlterID: number,

    Cipher: 'aes-128-gcm' | 'chacha20-poly1305' | 'auto' | 'none',

    ServerAddress: string,
    ServerPort: number,
    SupportUDP?: boolean,

    Transport: 'tcp' | 'kcp' | 'ws' | 'http' | 'domainsocket' | 'quic',
    TransportSecurity: 'none' | 'tls',

    // TLS Support
    ServerName?: string,

    // WebSocket Support
    WebSocketPath?: string,
    WebSocketHost?: string,
}