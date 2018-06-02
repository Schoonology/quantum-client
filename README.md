# Node client for Quantum

Zero-dependency client connector for [Quantum][quantum]-enabled devices. For more information on creating a device, see the [documentation][quantum].

## Installation

The client can be installed over npm, either local to a project or globally:

```
npm install [-g] quantum-client
```

## Basic usage (global)

A CLI is provided for shell usage, taking two arguments:

```
❯ quantum 010203040506070809101112 422753...
```

The first argument is the Photon-provided device ID. The ID for each the devices on your account can be shown with the `particle list` command.

The second argument is a series of octet "commands" to send to the device. This argument is interpreted as a series of hexidecimal characters (e.g. "42" turns to 0x42, or 66.

## Basic usage (local)

Local to a project, you can require the Quantum client and call `quantum.send` much like you would invoke the CLI:

```
const quantum = require('quantum-client')

quantum.send({
  deviceId: '010203040506070809101112',
  bits: '422753'
})
```

[quantum]: https://github.com/Schoonology/quantum
