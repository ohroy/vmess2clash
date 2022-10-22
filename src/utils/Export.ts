import type { VmessProxyServer } from "@/interfaces/server"
import YAML from 'yaml'

export default function FormatProxyForClash(ProxyList: VmessProxyServer[]): string {
    const proxies: any[] = []
    for (const rawProxy of ProxyList) {
        const config: any = {}
        if (rawProxy.Type === 'vmess') {
            const proxy = rawProxy
            config.name = proxy.Name
            config.type = 'vmess'
            config.server = proxy.ServerAddress
            config.port = proxy.ServerPort
            config.cipher = proxy.Cipher
            config.uuid = proxy.ClientID
            config.alterId = proxy.ClientAlterID
            if (proxy.SupportUDP) {
                config.udp = true
            }
            if (proxy.Transport !== 'tcp') {
                config.network = proxy.Transport
            }
            if (proxy.TransportSecurity === 'tls') {
                config.tls = true
            }
            if (proxy.Transport === 'ws' && proxy.WebSocketPath) {
                config['ws-path'] = proxy.WebSocketPath
            }
            if (proxy.Transport === 'ws' && proxy.WebSocketHost) {
                config['ws-headers'] = { Host: proxy.WebSocketHost }
            }
        } else {
            throw new Error(`unknown type: ${(rawProxy as any)?.Type}`)
        }
        proxies.push(config)
    }
    return YAML.stringify({ proxies })
}