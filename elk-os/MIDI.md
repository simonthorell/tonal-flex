# MIDI Connection to ElkOS

List connected MIDI-devices by running:

```shell
amidi -l
```

You should see output similar to:

```shell
Dir Device    Name
IO  hw:0,0,0  M4 MIDI 1
```

Track MIDI messages for the devices by running:

```shell
amidi -p hw:0,0,0 -d
```

You should see output such as below example:

```shell
B02F00
B02400
B02F01
C000
C001
```
