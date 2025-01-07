# MIDI Connection to ElkOS

## Connect Midi Device

### 1. List all connected MIDI devices:

```shell
aconnect -l
```

### 2. Note the ID of your MIDI Controller _(in this example it's 16)_

```sh
# Example Output
client 16: 'M4' [type=kernel,card=0]
    0 'M4 MIDI 1       '
```

### 3. Test MIDI messages:

```sh
# Replace 16 with your MIDI controller ID
aseqdump -p 16:0
```

### 4. Check the output:

```sh
# Example Output:
Source  Event                  Ch  Data
 16:0   Control change          0, controller 1, value 2
 16:0   Control change          0, controller 1, value 3
```

Take note of the channels and CC value outputs in order to make sure they match your config_file in next step.

## Map MIDI in plugin config files

In the plugin json `config_file`, specifiy the midi messages and parameters you want to map.

Example controlling 2 parameters using 2 potentiometers/exp pedals:

```sh
"midi" :
    {
        "cc_mappings" : [
            {
                "port" : 0,
                "channel" : "all",
                "cc_number" : 1,
                "plugin_name" : "TonalFlexReverb",
                "parameter_name" : "Wet Level",
                "min_range" : 0,
                "max_range" : 1
            },
            {
                "port" : 0,
                "channel" : "all",
                "cc_number" : 2,
                "plugin_name" : "TonalFlexReverb",
                "parameter_name" : "Room Size",
                "min_range" : 0,
                "max_range" : 1
            }
        ]
    }
```

## Map MIDI Controller to Sushi

The plugin you want to map your MIDI controller to must be running in **Sushi** before you can map them together.

Notes:

- Add `--log-level=debug` flag when starting Sushi for verbose logging.
- You can access the logfile by running: `cat /tmp/sushi.log`
- Replace `-r` with `--dummy` flag if your I/O is not supported by RASPA

### 1. Start **Sushi** in ElkOS

```sh
# Set the config_file path to your plugin
sushi -r --log-level=debug -c config_files/tonalflex_reverb.json
```

### 2. Check for connected MIDI devices:

```sh
aconnect -l
```

### 3. Check the output and selected what device to map with sushi:

```sh
# Example Output
client 0: 'System' [type=kernel]
    0 'Timer           '
    1 'Announce        '
client 14: 'Midi Through' [type=kernel]
    0 'Midi Through Port-0'
client 16: 'M4' [type=kernel,card=0]
    0 'M4 MIDI 1       '
client 128: 'Sushi' [type=user,pid=1103]
    0 'listen:in_1     '
    1 'listen:in_2     '
    2 'read:out_1      '
    3 'read:out_2      '
```

### 4. Map the Controller with sushi:

```sh
# In this example we are mapping M4 MIDI Controller to Sushi
aconnect 16:0 128:0
```

## Links

- https://elk-audio.github.io/elk-docs/html/sushi/sushi_configuration_format.html#midi
- https://elk-audio.github.io/elk-docs/html/elkpy-doc/elkpy.midicontroller.html
