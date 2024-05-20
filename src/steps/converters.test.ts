import { SentinelOneAgent, SentinelOneGroup } from '../client';
import {
  createAgentEntity,
  createGroupEntity,
  getMacAddresses,
} from './converters';

test('createAgentEntity', () => {
  const agent: SentinelOneAgent = {
    domain: 'mybusiness.net',
    appsVulnerabilityStatus: 'up_to_date',
    siteName: '225494730938493804',
    coreCount: 8,
    totalMemory: 8192,
    inRemoteShellSession: true,
    osArch: '32 bit',
    allowRemoteShell: true,
    scanStatus: 'started',
    consoleMigrationStatus: 'Failed',
    updatedAt: '2018-02-27T04:49:26.257525Z',
    osType: 'windows',
    userActionsNeeded: ['user_action_needed'],
    id: '225494730938493804',
    createdAt: '2018-02-27T04:49:26.257525Z',
    networkInterfaces: [
      {
        inet: ['192.168.0.1', '192.168.0.2'],
        physical: '00:25:96:FF:FE:12:34:56',
        id: '225494730938493804',
        name: 'string',
        inet6: ['2001:db8:a0b:12f0::1', '2001:db8:a0b:12f0::2'],
      },
      {
        gatewayIp: undefined,
        gatewayMacAddress: undefined,
        id: '1646418461658622399',
        inet: ['127.0.0.1'],
        inet6: [
          'fe80::29a4:c762:5e8a:d7ba',
          'fe80::ce81:b1c:bd2c:69e',
          'fe80::1d:2074:57da:d78a',
          'fe80::36cb:eb58:d82c:d73f',
          'fe80::4110:ece:cdcb:340f',
          '::1',
          'fe80::1',
        ],
        name: 'stf0',
        physical: '00:00:00:00:00:00',
      },
    ],
    externalIp: '31.155.5.7',
    computerName: 'JOHN-WIN-4125',
    modelName: 'Acme computers - 15x4k',
    uuid: 'ff819e70af13be381993075eb0ce5f2f6de05be2',
    encryptedApplications: true,
    activeDirectory: {
      computerDistinguishedName:
        'CN=TEMP-T470P,CN=Computers,DC=sentinelone,DC=com',
      lastUserMemberOf: [
        'CN=Users,DC=sentinelone,DC=com',
        'CN=Managers,CN=Users,DC=sentinelone,DC=com',
      ],
      computerMemberOf: [
        'CN=Computers,DC=sentinelone,DC=com',
        'CN=Servers,CN=Computers,DC=sentinelone,DC=com',
      ],
      lastUserDistinguishedName: 'CN=John Doe,CN=Users,DC=sentinelone,DC=com',
    },
    osUsername: 'string',
    groupName: 'string',
    infected: true,
    policyUpdatedAt: '2018-02-27T04:49:26.257525Z',
    cpuId: 'Acme chips inc. Pro5555 @ 3.33GHz',
    registeredAt: '2018-02-27T04:49:26.257525Z',
    activeThreats: 3,
    groupUpdatedAt: '2018-02-27T04:49:26.257525Z',
    machineType: 'unknown',
    groupIp: '31.155.5.x',
    osStartTime: '2018-02-27T04:49:26.257525Z',
    osRevision: 'string',
    scanAbortedAt: '2018-02-27T04:49:26.257525Z',
    siteId: '225494730938493804',
    scanStartedAt: '2018-02-27T04:49:26.257525Z',
    isPendingUninstall: true,
    scanFinishedAt: '2018-02-27T04:49:26.257525Z',
    lastActiveDate: '2018-02-27T04:49:26.257525Z',
    groupId: '225494730938493804',
    isActive: true,
    agentVersion: '2.5.0.2417',
    licenseKey: 'string',
    networkStatus: 'connected',
    lastLoggedInUserName: 'janedoe3',
    osName: 'Windows 10',
    mitigationMode: 'protect',
    cpuCount: 2,
    isUninstalled: true,
    isUpToDate: true,
    mitigationModeSuspicious: 'protect',
    isDecommissioned: true,
    serialNumber: 'dummy',
    missingPermissions: ['user_action_needs_fda'],
  };

  const { licenseKey, ...rawData } = agent;

  expect(createAgentEntity(agent)).toEqual({
    _rawData: [{ name: 'default', rawData: rawData }],
    _class: ['HostAgent'],
    _key: 'sentinelone_agent-id-225494730938493804',
    _type: 'sentinelone_agent',
    function: 'anti-malware',
    activeThreats: 3,
    adComputerDistinguishedName: undefined,
    agentVersion: '2.5.0.2417',
    allowRemoteShell: true,
    appsVulnerabilityStatus: 'up_to_date',
    computerName: 'JOHN-WIN-4125',
    consoleMigrationStatus: 'Failed',
    coreCount: 8,
    cpuCount: 2,
    cpuId: 'Acme chips inc. Pro5555 @ 3.33GHz',
    createdOn: 1519706966257,
    createdAt: 1519706966257,
    displayName: 'JOHN-WIN-4125',
    domain: 'mybusiness.net',
    encryptedApplications: true,
    externalIp: '31.155.5.7',
    groupId: '225494730938493804',
    groupIp: '31.155.5.x',
    groupName: 'string',
    groupUpdatedAt: 1519706966257,
    id: '225494730938493804',
    inRemoteShellSession: true,
    infected: true,
    isActive: true,
    isDecommissioned: true,
    isPendingUninstall: true,
    isUninstalled: true,
    isUpToDate: true,
    lastActiveDate: 1519706966257,
    lastLoggedInUserName: 'janedoe3',
    lastSeenOn: 1519706966257,
    machineType: 'unknown',
    mitigationMode: 'protect',
    mitigationModeSuspicious: 'protect',
    modelName: 'Acme computers - 15x4k',
    networkStatus: 'connected',
    osArch: '32 bit',
    osName: 'Windows 10',
    osRevision: 'string',
    osStartTime: 1519706966257,
    osType: 'windows',
    osUsername: 'string',
    policyUpdatedAt: 1519706966257,
    registeredAt: 1519706966257,
    scanAbortedAt: 1519706966257,
    scanFinishedAt: 1519706966257,
    scanStartedAt: 1519706966257,
    scanStatus: 'started',
    siteId: '225494730938493804',
    siteName: '225494730938493804',
    totalMemory: 8192,
    updatedAt: 1519706966257,
    uuid: 'ff819e70af13be381993075eb0ce5f2f6de05be2',
    macAddress: ['00:25:96:FF:FE:12:34:56'],
    serial: 'dummy',
    missingPermissions: ['user_action_needs_fda'],
  });
});

test('createAgentEntity with a gatewayIp networkInterface', () => {
  const agent: SentinelOneAgent = {
    domain: 'mybusiness.net',
    appsVulnerabilityStatus: 'up_to_date',
    siteName: '225494730938493804',
    coreCount: 8,
    totalMemory: 8192,
    inRemoteShellSession: true,
    osArch: '32 bit',
    allowRemoteShell: true,
    scanStatus: 'started',
    consoleMigrationStatus: 'Failed',
    updatedAt: '2018-02-27T04:49:26.257525Z',
    osType: 'windows',
    userActionsNeeded: ['user_action_needed'],
    id: '225494730938493804',
    createdAt: '2018-02-27T04:49:26.257525Z',
    networkInterfaces: [
      {
        inet: ['192.168.0.1', '192.168.0.2'],
        physical: '00:25:96:FF:FE:12:34:56',
        id: '225494730938493804',
        name: 'string',
        inet6: ['2001:db8:a0b:12f0::1', '2001:db8:a0b:12f0::2'],
      },
      {
        gatewayIp: 'something',
        gatewayMacAddress: '00:25:96:FF:FE:12:34:57',
        id: '1646418461658622399',
        inet: ['127.0.0.1'],
        inet6: [],
        name: 'stf0',
        physical: '11:25:96:FF:FE:12:34:56',
      },
    ],
    externalIp: '31.155.5.7',
    computerName: 'JOHN-WIN-4125',
    modelName: 'Acme computers - 15x4k',
    uuid: 'ff819e70af13be381993075eb0ce5f2f6de05be2',
    encryptedApplications: true,
    activeDirectory: {
      computerDistinguishedName:
        'CN=TEMP-T470P,CN=Computers,DC=sentinelone,DC=com',
      lastUserMemberOf: [
        'CN=Users,DC=sentinelone,DC=com',
        'CN=Managers,CN=Users,DC=sentinelone,DC=com',
      ],
      computerMemberOf: [
        'CN=Computers,DC=sentinelone,DC=com',
        'CN=Servers,CN=Computers,DC=sentinelone,DC=com',
      ],
      lastUserDistinguishedName: 'CN=John Doe,CN=Users,DC=sentinelone,DC=com',
    },
    osUsername: 'string',
    groupName: 'string',
    infected: true,
    policyUpdatedAt: '2018-02-27T04:49:26.257525Z',
    cpuId: 'Acme chips inc. Pro5555 @ 3.33GHz',
    registeredAt: '2018-02-27T04:49:26.257525Z',
    activeThreats: 3,
    groupUpdatedAt: '2018-02-27T04:49:26.257525Z',
    machineType: 'unknown',
    groupIp: '31.155.5.x',
    osStartTime: '2018-02-27T04:49:26.257525Z',
    osRevision: 'string',
    scanAbortedAt: '2018-02-27T04:49:26.257525Z',
    siteId: '225494730938493804',
    scanStartedAt: '2018-02-27T04:49:26.257525Z',
    isPendingUninstall: true,
    scanFinishedAt: '2018-02-27T04:49:26.257525Z',
    lastActiveDate: '2018-02-27T04:49:26.257525Z',
    groupId: '225494730938493804',
    isActive: true,
    agentVersion: '2.5.0.2417',
    licenseKey: 'string',
    networkStatus: 'connected',
    lastLoggedInUserName: 'janedoe3',
    osName: 'Windows 10',
    mitigationMode: 'protect',
    cpuCount: 2,
    isUninstalled: true,
    isUpToDate: true,
    mitigationModeSuspicious: 'protect',
    isDecommissioned: true,
    serialNumber: 'dummy',
  };

  const { licenseKey, ...rawData } = agent;

  expect(createAgentEntity(agent)).toEqual({
    _rawData: [{ name: 'default', rawData: rawData }],
    _class: ['HostAgent'],
    _key: 'sentinelone_agent-id-225494730938493804',
    _type: 'sentinelone_agent',
    function: 'anti-malware',
    activeThreats: 3,
    adComputerDistinguishedName: undefined,
    agentVersion: '2.5.0.2417',
    allowRemoteShell: true,
    appsVulnerabilityStatus: 'up_to_date',
    computerName: 'JOHN-WIN-4125',
    consoleMigrationStatus: 'Failed',
    coreCount: 8,
    cpuCount: 2,
    cpuId: 'Acme chips inc. Pro5555 @ 3.33GHz',
    createdOn: 1519706966257,
    createdAt: 1519706966257,
    displayName: 'JOHN-WIN-4125',
    domain: 'mybusiness.net',
    encryptedApplications: true,
    externalIp: '31.155.5.7',
    groupId: '225494730938493804',
    groupIp: '31.155.5.x',
    groupName: 'string',
    groupUpdatedAt: 1519706966257,
    id: '225494730938493804',
    inRemoteShellSession: true,
    infected: true,
    isActive: true,
    isDecommissioned: true,
    isPendingUninstall: true,
    isUninstalled: true,
    isUpToDate: true,
    lastActiveDate: 1519706966257,
    lastLoggedInUserName: 'janedoe3',
    lastSeenOn: 1519706966257,
    machineType: 'unknown',
    mitigationMode: 'protect',
    mitigationModeSuspicious: 'protect',
    modelName: 'Acme computers - 15x4k',
    networkStatus: 'connected',
    osArch: '32 bit',
    osName: 'Windows 10',
    osRevision: 'string',
    osStartTime: 1519706966257,
    osType: 'windows',
    osUsername: 'string',
    policyUpdatedAt: 1519706966257,
    registeredAt: 1519706966257,
    scanAbortedAt: 1519706966257,
    scanFinishedAt: 1519706966257,
    scanStartedAt: 1519706966257,
    scanStatus: 'started',
    siteId: '225494730938493804',
    siteName: '225494730938493804',
    totalMemory: 8192,
    updatedAt: 1519706966257,
    uuid: 'ff819e70af13be381993075eb0ce5f2f6de05be2',
    macAddress: ['00:25:96:FF:FE:12:34:56', '00:25:96:FF:FE:12:34:57'],
    serial: 'dummy',
  });
});

test('createGroupEntity', () => {
  const group: SentinelOneGroup = {
    inherits: true,
    name: 'string',
    creator: 'string',
    filterName: 'string',
    totalAgents: 0,
    filterId: '225494730938493804',
    rank: 1,
    siteId: '225494730938493804',
    isDefault: true,
    creatorId: '225494730938493804',
    updatedAt: '2018-02-27T04:49:26.257525Z',
    type: 'static',
    id: '225494730938493804',
    createdAt: '2018-02-27T04:49:26.257525Z',
  };
  expect(createGroupEntity(group)).toEqual({
    _rawData: [{ name: 'default', rawData: group }],
    _class: ['Group'],
    _key: 'sentinelone_group-id-225494730938493804',
    _type: 'sentinelone_group',
    createdOn: 1519706966257,
    createdAt: 1519706966257,
    creator: 'string',
    creatorId: '225494730938493804',
    displayName: 'string static',
    filterId: '225494730938493804',
    filterName: 'string',
    id: '225494730938493804',
    inherits: true,
    isDefault: true,
    name: 'string',
    rank: 1,
    siteId: '225494730938493804',
    totalAgents: 0,
    type: 'static',
    updatedAt: 1519706966257,
  });
});

describe('getMacAddresses', () => {
  it('should return an empty array if there are no network interfaces', () => {
    const result = getMacAddresses([]);
    expect(result).toEqual([]);
  });

  it('should return only public MAC addresses', () => {
    const networkInterfaces: SentinelOneAgent['networkInterfaces'] = [
      {
        physical: '00:00:00:00:00:01',
        inet: ['192.168.0.1'],
      },
      {
        physical: '00:00:00:00:00:02',
        inet: ['8.8.8.8'],
      },
    ] as SentinelOneAgent['networkInterfaces'];
    const result = getMacAddresses(networkInterfaces);
    expect(result).toEqual(['00:00:00:00:00:02']);
  });

  it('should filter out the default MAC address 00:00:00:00:00:00', () => {
    const networkInterfaces: SentinelOneAgent['networkInterfaces'] = [
      {
        physical: '00:00:00:00:00:00',
        inet: ['8.8.8.8'],
      },
    ] as SentinelOneAgent['networkInterfaces'];
    const result = getMacAddresses(networkInterfaces);
    expect(result).toEqual([]);
  });

  it('should include MAC addresses associated with public IPv6 addresses', () => {
    const networkInterfaces: SentinelOneAgent['networkInterfaces'] = [
      {
        physical: '00:00:00:00:00:03',
        inet6: ['2001:0db8:85a3:0000:0000:8a2e:0370:7334'],
      },
    ] as SentinelOneAgent['networkInterfaces'];
    const result = getMacAddresses(networkInterfaces);
    expect(result).toEqual(['00:00:00:00:00:03']);
  });

  it('should include MAC addresses with gateway IPs and gateway MAC addresses', () => {
    const networkInterfaces: SentinelOneAgent['networkInterfaces'] = [
      {
        physical: '00:00:00:00:00:04',
        inet: ['8.8.8.8'],
        gatewayIp: '192.168.1.1',
        gatewayMacAddress: '00:00:00:00:00:05',
      },
    ] as SentinelOneAgent['networkInterfaces'];
    const result = getMacAddresses(networkInterfaces);
    expect(result).toEqual(['00:00:00:00:00:04', '00:00:00:00:00:05']);
  });

  it('should not include MAC addresses associated with private IPv4 addresses', () => {
    const networkInterfaces: SentinelOneAgent['networkInterfaces'] = [
      {
        physical: '00:00:00:00:00:06',
        inet: ['10.0.0.1'],
      },
    ] as SentinelOneAgent['networkInterfaces'];
    const result = getMacAddresses(networkInterfaces);
    expect(result).toEqual([]);
  });

  it('should not include MAC addresses associated with private IPv6 addresses', () => {
    const networkInterfaces: SentinelOneAgent['networkInterfaces'] = [
      {
        physical: '00:00:00:00:00:07',
        inet6: ['fe80::1'],
      },
    ] as SentinelOneAgent['networkInterfaces'];
    const result = getMacAddresses(networkInterfaces);
    expect(result).toEqual([]);
  });

  //Tests for IPv6 Address Ranges

  it('should not include MAC addresses associated with IPv6 ULA addresses', () => {
    const networkInterfaces: SentinelOneAgent['networkInterfaces'] = [
      {
        physical: '00:00:00:00:00:08',
        inet6: ['fc12:3456::1'],
      },
      {
        physical: '00:00:00:00:00:09',
        inet6: ['fd34:5678::1'],
      },
      {
        physical: '00:00:00:00:00:10',
        inet6: ['2001:0db8::1'], // Should not match
      },
    ] as SentinelOneAgent['networkInterfaces'];
    const result = getMacAddresses(networkInterfaces);
    expect(result).toEqual(['00:00:00:00:00:10']);
  });

  it('should not include MAC addresses associated with IPv6 Link-Local addresses', () => {
    const networkInterfaces: SentinelOneAgent['networkInterfaces'] = [
      {
        physical: '00:00:00:00:00:11',
        inet6: ['fe80::1'],
      },
      {
        physical: '00:00:00:00:00:12',
        inet6: ['fe91::1'],
      },
      {
        physical: '00:00:00:00:00:13',
        inet6: ['fea2::1'],
      },
      {
        physical: '00:00:00:00:00:14',
        inet6: ['feb3::1'],
      },
      {
        physical: '00:00:00:00:00:15',
        inet6: ['2001:0db8::1'], // Should not match
      },
    ] as SentinelOneAgent['networkInterfaces'];
    const result = getMacAddresses(networkInterfaces);
    expect(result).toEqual(['00:00:00:00:00:15']);
  });

  it('should not include MAC addresses associated with simplified IPv6 addresses but it should match the correct IPv6 addresses', () => {
    const networkInterfaces: SentinelOneAgent['networkInterfaces'] = [
      {
        physical: '00:00:00:00:00:16',
        inet6: ['fc00::1'],
      },
      {
        physical: '00:00:00:00:00:17',
        inet6: ['fd00::1'],
      },
      {
        physical: '00:00:00:00:00:18',
        inet6: ['fe80::1'],
      },
      {
        physical: '00:00:00:00:00:19',
        inet6: ['2001:0db8::1'], // Should not match
      },
    ] as SentinelOneAgent['networkInterfaces'];
    const result = getMacAddresses(networkInterfaces);
    expect(result).toEqual(['00:00:00:00:00:19']);
  });
});
