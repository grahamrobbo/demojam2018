The right of deactivation of the fall manager is managed by the ALMotion preference into the robot. (/home/nao/.config/naoqi/ALMotion.xml).

Hello, you could use a program like FileZilla to connect to NAO and browse his filesystem. Then I guess when you open the file ALMotion.xml there would be a line that states Fall_Manager_Preference: true and you would change true to false, save and restart NAO. Although I have never heard of this method to disable fall detection.

The right of deactivation of the fall manager is managed by the ALMotion preference into the robot. (/home/nao/.config/naoqi/ALMotion.xml).

So, you can edit by hand this file or use the ALPreferenceManager.

The name of the preferences in ALMotion.xml is: “ENABLE_DEACTIVATION_OF_FALL_MANAGER”.

And the preference file should have this form:

<Preference name="ENABLE_DEACTIVATION_OF_FALL_MANAGER" description="If true the
deactivation of Fall Manager and other critical safety reflexes is allowed"
value="true" type="bool" />

