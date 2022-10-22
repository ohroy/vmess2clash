import type { VmessProxyServer } from "@/interfaces/server"
import * as Base64 from 'js-base64'
export default function GetProxyListFromBase64(content: string): VmessProxyServer[] {
    const data = content.split('\n')
    if (!data?.length) {
        throw new Error('cannot find proxy list. cause len='+data?.length)
    }
    return data.map(x => x.trim()).filter(Boolean).map((line: string) => {
        if (line.startsWith('vmess://')) {
            return GetProxyFromVmessURL(line.replace('vmess://', ''))
        }else{
            console.log(line)
            throw new Error('cannot find proxy list.')
        }
    })
}

function GetProxyFromVmessURL(data: string): VmessProxyServer {
    const config = JSON.parse(Base64.decode(data))
    if (+config.v !== 2) {
        throw new Error("!23123")
    }
    const result: VmessProxyServer = {
        Cipher: config.type || 'auto',
        ClientAlterID: config.aid ? +config.aid : 0,
        ClientID: config.id,
        Name: config.ps,
        ServerAddress: config.add,
        ServerPort: config.port,
        SupportUDP: true,
        Transport: config.net || 'tcp',
        TransportSecurity: config.tls ? 'tls' : 'none',
        Type: "vmess",
    }
    if (result.Transport === 'ws') {
        result.WebSocketPath = config['ws-path'] || config['path'] || '/'
    }
    if (result.Transport === 'ws' && config.host) {
        result.WebSocketHost = config.host
    }
    return result
}



