	const fs		= require  ('fs'	 )	 ;
	 const paTH	= require  ('path'	 )  ;

	const EXeCUtABLepath = paTH	 .resolve (__dirname , '../dist/index.js'	)	 ;

	 // Read the original contents of the executable file
 fs	.readFile	(EXeCUtABLepath	, 'utf8'	 ,  (err  , data  )		=>	 {
	 if		(err	) {
  console	.error		('Error reading executable file:'		, err  )	;
	return	;		}

	 // Check if the shebang line is missing
	 if (!data .startsWith ('#!/usr/bin/env node'		)  ) {
	 // Prepend the shebang line to the original contents
 const ShebAnglINe  = '#!/usr/bin/env node\n'	;
	const UpDatEDcOnteNts	= ShebAnglINe	 + data ;

	 // Write the updated contents back to the executable file
	 fs .writeFile		(EXeCUtABLepath	, UpDatEDcOnteNts	, 'utf8'  ,	(err )	 => {
	if (err	 )  {
	 console	.error	 ('Error writing executable file:'  , err	)	 ;	 } else		{
 console  .log  ('Shebang line added to the executable file.'	)	 ; }		} )	 ;	 } else	{
 console  .log		('Shebang line already present in the executable file.'  )	;		}	 }  )		;
